import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<boolean> {
  constructor(private authService: AuthService, private router: Router) {}

  resolve(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(true);
        // const isAuthenticated = this.authService.isUserAuthenticated;
        // if (isAuthenticated) {
        //   resolve(true);
        // } else {
        //   this.router.navigate(['/login']);
        //   resolve(false);
        // }
    });
  }
}