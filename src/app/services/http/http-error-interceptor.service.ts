import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  private readonly TOKEN_KEY = 'auth_token';
  public isSpinnerVisible = false;

  constructor() { }

  /**
   * Catch HTTP requests and process on success or error
   * @param request 
   * @param next 
   * @returns 
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.isSpinnerVisible = true;

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.handleHttpResponse(event);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.handleHttpError(error);
        return throwError(() => error);
      }),
      finalize(() => this.isSpinnerVisible = false)
    );
  }

  /**
   * Handle success HTTP requests
   * @param response 
   */
  private handleHttpResponse(response: HttpResponse<any>): void {
    if (response.status === 201) {
      // Requête POST réussie avec retour 201
      // this.showSnackbar('Element ajouté avec succès.', true);
    }
  }

  /**
   * Handle error HTTP requests
   * @param error 
   */
  private handleHttpError(error: HttpErrorResponse): void {
    let errorMessage = 'Une erreur s\'est produite.';
    console.log('handleHttpError');

    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
    } else {
      // Erreur côté serveur
      if (error.status === 403) {
        localStorage.removeItem(this.TOKEN_KEY);
      }
    }

    // this.showSnackbar(errorMessage, false);
  }

  // /**
  //  * Trigger the snackbar
  //  * @param message 
  //  * @param isSuccess 
  //  */
  // private showSnackbar(message: string, isSuccess: boolean): void {
  //   this.snackBar.open(message, 'Fermer', {
  //     duration: 5000,
  //     horizontalPosition: 'center',
  //     verticalPosition: 'bottom',
  //     panelClass: [isSuccess ? 'success-snackbar' : 'error-snackbar'] // Classe CSS personnalisée pour la couleur verte
  //   });
  // }
}
