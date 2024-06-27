import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  private readonly TOKEN_KEY = 'auth_token';

  constructor() { }

  /**
   * Check if token is present in localStorage and put it in Authorization header
   * @param request 
   * @param next 
   * @returns Observable
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    
    if (token) {
      const clonnedRequest = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
      return next.handle(clonnedRequest);
    }
    return next.handle(request);
  }
}
