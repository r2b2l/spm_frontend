import { Inject, Injectable } from '@angular/core';
import { User } from '../../models/user/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

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
  // private authTokenSource = new BehaviorSubject<string | null>(null);
  private authState = new BehaviorSubject<boolean>(false);
  // private authState = new BehaviorSubject<boolean>(this.isUserAuthenticated);
  // authToken$ = this.authTokenSource.asObservable();
  authState$ = this.authState.asObservable();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private router: Router, @Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
    console.log(this.localStorage);
    if (this.localStorage && this.localStorage.getItem(this.TOKEN_KEY)) {
      this.authState.next(true);
    }
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
      console.log('isUserAuthenticated, No local storage');
      return false;
    }
    return !!this.localStorage.getItem(this.TOKEN_KEY);
  }

  get authToken(): string | null {
    if (!this.localStorage) {
      return null;
    }
    const token = this.localStorage.getItem(this.TOKEN_KEY);
    return token;
  }

  /**
   * Update token
   * @param token | null
   */
  set authToken(token: string | null) {
    if (this.localStorage) {
      if (token) {
        this.localStorage.setItem(this.TOKEN_KEY, token);
        this.authState.next(true);
      } else {
        this.localStorage.removeItem(this.TOKEN_KEY);
        this.authState.next(false);
      }
    }
  }
}
