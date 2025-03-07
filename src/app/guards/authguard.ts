import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const redirectTo = route.data['redirecTo'];
    return this.authService.authState$.pipe(
      map(isAuthenticated => {
        console.log('[AuthGuard] Auth state:', isAuthenticated);
        if (!isAuthenticated) {
          if (redirectTo) {
            this.router.navigate(['/login'], { queryParams: { redirectAfterLogin: redirectTo } });
          }
          this.router.navigate(['/login']); // 🔹 Rediriger UNIQUEMENT si authState est bien `false`
          return false;
        }
        return true;
      })
    );
  }

  // const redirectTo = route.data['redirecTo'];
    // if (!this.authService.isUserAuthenticated) {
    //   console.log('AuthGuard: user not authenticated, redirecting to login');
    //   this.authService.authToken = null;
    //   this.router.navigateByUrl('/login?redirectAfterLogin=' + redirectTo);
    //   return false;
    // }
    // console.log('AuthGuard: user authenticated');
    // return true;
}
