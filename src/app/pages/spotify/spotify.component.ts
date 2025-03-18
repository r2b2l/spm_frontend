import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/platform/spotify.service';
import { CommonModule, DatePipe } from '@angular/common';
import { TablePlaceholderComponent } from "../placeholders/table-placeholder/table-placeholder.component";
import { PlaylistTableComponent } from "./playlist/playlist-table/playlist-table.component";
import { PlaylistService } from '../../services/playlist/playlist.service';

@Component({
  selector: 'app-spotify',
  standalone: true,
  imports: [CommonModule, TablePlaceholderComponent, PlaylistTableComponent],
  templateUrl: './spotify.component.html',
  styleUrl: './spotify.component.scss',
  providers: [DatePipe]
})
export class SpotifyComponent implements OnInit {
  isLoading: boolean = false;
  isConnected: boolean = false;
  playlists: Array<any> = [];

  constructor(private spotifyService: SpotifyService, private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.isLoading = true;
    // First, fetch all playlists in our database
    this.getSpotifyPlaylistsFromDatabase();
    this.spotifyService.isConnected().subscribe((data: any) => {
      this.isConnected = data.isConnected;
      console.log('Spotify connected ?', this.isConnected);
    });
  }

  connect(): void {
    this.spotifyService.connect().subscribe((data: any) => {
      window.location.href = data.url + '&token=' + localStorage.getItem('auth_token');
      // console.log('https://accounts.spotify.com/authorize?client_id=3cb1e4a80f464550988fb903e42a5109&response_type=code&redirect_uri=http://localhost:3000/platform/connect/spotify/callback&scope=user-read-private user-read-email');
      // window.location.href = `https://accounts.spotify.com/authorize?client_id=3cb1e4a80f464550988fb903e42a5109&response_type=code&redirect_uri=http://localhost:3000/platform/connect/spotify/callback&scope=user-read-private user-read-email`;
    });
  }

  loadPlaylists(): void {
    this.isLoading = true;
    this.playlists = [];
  }

  DoneLoadPlaylists(): void {
    this.isLoading = false;
  }

  getSpotifyPlaylistsFromDatabase(): void {
    this.loadPlaylists();
    this.playlistService.getPlaylistByPlatformName('Spotify').subscribe((data: any) => {
      // order the playlists by date descending
      data.sort((a: any, b: any) => {
        return b.tracksNumber - a.tracksNumber;
      });
      this.playlists = data;
      this.DoneLoadPlaylists();
    });
  }

  getPlaylistsFromSpotify(): void {
    this.loadPlaylists();
    this.spotifyService.getPlaylists().subscribe((data: any) => {
      data.sort((a: any, b: any) => {
        return b.tracksNumber - a.tracksNumber;
      });
      
      this.playlists = data;
      this.DoneLoadPlaylists();
    });
  }
}
