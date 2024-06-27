import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user/user';
import { ApiResponse } from '../../models/api/api-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + '/user';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /**
   * Create a user
   * @param user 
   * @returns 
   */
  createUser(user: User): Observable<boolean> {
    const postUrl = this.apiUrl + '/create';
    return this.http.post<ApiResponse>(postUrl, {
      username: user.username,
      mail: user.mail,
      password: user.password
    }, this.httpOptions).pipe(
      map(data => data.isSuccess)
    )
  }

  /**
   * Get a user by a username
   * @param username 
   * @returns 
   */
  getUsersByUsername(username: string): Observable<User[]> {
    const getUrl = this.apiUrl + '/findBy/username/' + username;
    return this.http.get<ApiResponse>(getUrl, this.httpOptions).pipe(
      map(data => data.rows)
    );
  }
}
