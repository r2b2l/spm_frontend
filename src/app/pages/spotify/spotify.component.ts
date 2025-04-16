import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/platform/spotify.service';
import { CommonModule, DatePipe } from '@angular/common';
import { TablePlaceholderComponent } from "../placeholders/table-placeholder/table-placeholder.component";
import { PlaylistTableComponent } from "./playlist/playlist-table/playlist-table.component";
import { PlaylistService } from '../../services/playlist/playlist.service';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'app-spotify',
    imports: [CommonModule, TablePlaceholderComponent, PlaylistTableComponent],
    templateUrl: './spotify.component.html',
    styleUrl: './spotify.component.scss',
    providers: [DatePipe]
})
export class SpotifyComponent implements OnInit {
  isLoading = false;
  isConnectedData$: Observable<any> | undefined;
  playlists$: Observable<Array<any>> | undefined;

  constructor(private spotifyService: SpotifyService, private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.isLoading = true;
    // First, fetch all playlists in our database
    this.getSpotifyPlaylistsFromDatabase();
    this.isConnectedData$ = this.spotifyService.isConnected();
  }

  connect(): void {
    this.spotifyService.connect().subscribe((data: any) => {
      window.location.href = data.url + '&token=' + localStorage.getItem('auth_token');
      // console.log('https://accounts.spotify.com/authorize?client_id=3cb1e4a80f464550988fb903e42a5109&response_type=code&redirect_uri=http://localhost:3000/platform/connect/spotify/callback&scope=user-read-private user-read-email');
      // window.location.href = `https://accounts.spotify.com/authorize?client_id=3cb1e4a80f464550988fb903e42a5109&response_type=code&redirect_uri=http://localhost:3000/platform/connect/spotify/callback&scope=user-read-private user-read-email`;
    });
  }

  getSpotifyPlaylistsFromDatabase(): void {
    // Fetch playlists and sort it inside Observable
    this.playlists$ = this.playlistService.getPlaylistByPlatformName('Spotify')
      .pipe(
        map((data: any) => {
          // Sort the playlists by date descending
          data.sort((a: any, b: any) => {
            return b.updatedAt - a.updatedAt;
          });
          return data;
        })
      );
  }

  getPlaylistsFromSpotify(): void {
    // this.spotifyService.getPlaylists()
    // Fetch playlists and sort it inside Observable
    this.playlists$ = this.spotifyService.getPlaylists()
      .pipe(
        map((data: any) => {
          // Sort the playlists by date descending
          data.sort((a: any, b: any) => {
            return b.updatedAt - a.updatedAt;
          });
          return data;
        })
      );
  }
}
