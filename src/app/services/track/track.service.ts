import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private apiUrl = environment.apiUrl;
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  constructor(private http: HttpClient) { }

    patchTrackSync(playlistId: string, trackId: string, isDisabled: boolean): Observable<any> {
      const patchUrl = this.apiUrl + '/playlisttracks/' + playlistId + '/track/' + trackId + '/sync';
      return this.http.patch(patchUrl, {
        isDisabled
      }, this.httpOptions);
    }
}
