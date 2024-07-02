import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = environment.apiUrl + '/platform';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  isConnected(): Observable<any> {
    const getUrl = this.apiUrl + '/isConnectedTo/1'; // 1 is the Spotoify platform id, should be nammed isConnected/spotify
    return this.http.get(getUrl, this.httpOptions);
  }

  connect(): Observable<any> {
    const getUrl = this.apiUrl + '/connect/spotify';
    return this.http.get(getUrl, this.httpOptions);
  }
}
