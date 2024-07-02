import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/platform/spotify.service';

@Component({
  selector: 'app-spotify',
  standalone: true,
  imports: [],
  templateUrl: './spotify.component.html',
  styleUrl: './spotify.component.scss'
})
export class SpotifyComponent implements OnInit {
  isConnected: boolean = false;
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
     this.spotifyService.isConnected().subscribe((data: any) => {
      this.isConnected = data.isConnected;
      console.log(this.isConnected);
    });
  }

  connect() {
    this.spotifyService.connect().subscribe((data: any) => {
      console.log(data.url);
      window.location.href = data.url;
      // console.log('https://accounts.spotify.com/authorize?client_id=3cb1e4a80f464550988fb903e42a5109&response_type=code&redirect_uri=http://localhost:3000/platform/connect/spotify/callback&scope=user-read-private user-read-email');
      // window.location.href = `https://accounts.spotify.com/authorize?client_id=3cb1e4a80f464550988fb903e42a5109&response_type=code&redirect_uri=http://localhost:3000/platform/connect/spotify/callback&scope=user-read-private user-read-email`;
    });
  }
}
