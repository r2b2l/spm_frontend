import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/platform/spotify.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-spotify',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spotify.component.html',
  styleUrl: './spotify.component.scss',
  providers: [DatePipe]
})
export class SpotifyComponent implements OnInit {
  isLoading: boolean = false;
  isConnected: boolean = false;
  playlists: Array<any> = [];
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.spotifyService.isConnected().subscribe((data: any) => {
      this.isConnected = data.isConnected;
      console.log('Spotify connected ?', this.isConnected);
      if (this.isConnected) {
        this.getPlaylists();
      } else {
        this.isLoading = false;
      }
    });
  }

  connect() {
    this.spotifyService.connect().subscribe((data: any) => {
      window.location.href = data.url + '&token=' + localStorage.getItem('auth_token');


      // console.log('https://accounts.spotify.com/authorize?client_id=3cb1e4a80f464550988fb903e42a5109&response_type=code&redirect_uri=http://localhost:3000/platform/connect/spotify/callback&scope=user-read-private user-read-email');
      // window.location.href = `https://accounts.spotify.com/authorize?client_id=3cb1e4a80f464550988fb903e42a5109&response_type=code&redirect_uri=http://localhost:3000/platform/connect/spotify/callback&scope=user-read-private user-read-email`;
    });
  }

  getPlaylists() {
    this.spotifyService.getPlaylists().subscribe((data: any) => {
      this.playlists = data;
      this.isLoading = false;
    });
  }

  triggerModal() {
    console.log('triggerModal');
    const modal = document.getElementById('import');
    // Check if modal element exists before removing the 'hidden' class
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.remove('opacity-0');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  closeModal() {
    console.log('closeModal');
    const modal = document.getElementById('import');
    // Check if modal element exists before adding the 'hidden' class
    if (modal) {
      modal.classList.add('opacity-0');
      modal.setAttribute('aria-hidden', 'true');
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 500);
    }
  }

  openPlaylist(playlist: any) {
    console.log('openPlaylist', playlist);
  }
}
