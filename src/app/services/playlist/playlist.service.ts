import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private apiUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }

  getPlaylists(): Observable<any> {
    const getUrl = this.apiUrl + '/playlist/playlists';
    return this.http.get(getUrl, this.httpOptions);
  }

  getPlaylistTracks(playlistId: number): Observable<any> {
    const getUrl = this.apiUrl + '/playlisttracks/' + playlistId + '/tracks';
    return this.http.get(getUrl, this.httpOptions);
  }
}
