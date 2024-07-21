import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = environment.apiUrl;
  private platformApiUrl = environment.apiUrl + '/platform';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  isConnected(): Observable<any> {
    const getUrl = this.platformApiUrl + '/isConnectedTo/1'; // 1 is the Spotoify platform id, should be nammed isConnected/spotify
    return this.http.get(getUrl, this.httpOptions);
  }

  connect(): Observable<any> {
    const getUrl = this.platformApiUrl + '/connect/spotify';
    return this.http.get(getUrl, this.httpOptions);
  }

  getPlaylists(): Observable<any> {
    const getUrl = this.apiUrl + '/spotify/playlists';
    return this.http.get(getUrl, this.httpOptions);
  }

  getTracks(playlistId: number): Observable<any> {
    const getUrl = this.apiUrl + '/spotify/playlist/' + playlistId + '/tracks';
    return this.http.get(getUrl, this.httpOptions);
  }

  disablePlaylistTracks(playlistId: number, tracksIds: Array<number>, disableTracks: boolean): Observable<any> {
    const postUrl = this.apiUrl + '/spotify/playlist/' + playlistId + '/disableTracks';
    return this.http.patch(postUrl, { tracksIds, disableTracks }, this.httpOptions);
  }
}
