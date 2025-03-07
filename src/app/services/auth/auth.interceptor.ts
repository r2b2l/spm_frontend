import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log('authInterceptor');  
  const token = localStorage.getItem('auth_token');
    
    if (token) {
      const clonnedRequest = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
      return next(clonnedRequest);
    }
    return next(request);
}