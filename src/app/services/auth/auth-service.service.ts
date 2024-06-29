import { Inject, Injectable } from '@angular/core';
import { User } from '../../models/user/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DOCUMENT } from '@angular/common';

interface ApiLoginResponse {
  isSuccess: boolean;
  token: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private apiUrl = environment.apiUrl;
  private localStorage: Storage | undefined;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private router: Router, @Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
   }

  /**
   * Log and redirect user to root or specified route
   * @param user 
   * @param redirectRoute 
   */
  login(user: User, redirectRoute: string): void {
    console.log('login', user, redirectRoute);
    this.http.post<ApiLoginResponse>(this.apiUrl + '/login', {
      mail: user.mail,
      password: user.password
    }, this.httpOptions).subscribe(data => {
      this.authToken = data.token;

      if (redirectRoute !== '') {
        this.router.navigateByUrl(redirectRoute);
      }
      this.router.navigateByUrl('');
    });
  }

  /**
   * Log out
   */
  logout(): void {
    this.authToken = null;
  }

  /**
   * Check if Auth Token is present in localStorage
   */
  get isUserAuthenticated(): boolean {
    if (!this.localStorage) {
      return false;
    }
    return !!this.localStorage.getItem(this.TOKEN_KEY);
  }

  get authToken(): string | null {
    if (!this.localStorage) {
      return null;
    }
    return this.localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Update token
   * @param token | null
   */
  set authToken(token: string | null) {
    if (this.localStorage) {
      if (token) {
        this.localStorage.setItem(this.TOKEN_KEY, token)
      } else {
        this.localStorage.removeItem(this.TOKEN_KEY);
      }
    }
  }
}
