import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, finalize, Observable, tap, throwError } from "rxjs";

export function httpErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const TOKEN_KEY = 'auth_token';
    const router = new Router();

    return next(req).pipe(tap(event => {}),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
            localStorage.removeItem(TOKEN_KEY);
            router.navigateByUrl('/login');
        }
        return throwError(() => {});
      }),
      finalize(() => {}));
  }