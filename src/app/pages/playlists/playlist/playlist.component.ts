import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { TablePlaceholderComponent } from '../../placeholders/table-placeholder/table-placeholder.component';
import { SimpleTableComponent } from '../../shared/simple-table/simple-table.component';
import { CardPlaceholderComponent } from '../../placeholders/card-placeholder/card-placeholder.component';
import { SpotifyService } from '../../../services/platform/spotify.service';

// Todo: Create a TrackModel interface
interface TrackModel {
  name: string;
  albumName: string;
  artists: string;
  disabled: boolean;
  addedAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [TablePlaceholderComponent, CardPlaceholderComponent, SimpleTableComponent],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent implements OnInit {
  private playlistId!: string;
  public playlist: any;
  public playlistTracks: Array<any> = [];
  public artists: { [key: string]: number } = {};
  public topArtists: Array<any> = [];
  public isHeaderLoaded: boolean = false;
  public isTracksLoaded: boolean = false;
  public isSpotifyConnected: boolean|null = null;

  columns: { key: keyof TrackModel; label: string }[] = [
    { key: 'name', label: 'Playlist' },
    { key: 'artists', label: 'Artiste(s)' },
    { key: 'albumName', label: 'Album' },
    { key: 'addedAt', label: 'Ajouté le' },
  ];


  constructor(private route: ActivatedRoute, 
    private playlistService: PlaylistService,
    private spotifyService: SpotifyService
  ) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.playlistId = params['playlistId'];
      this.getPlaylistById();
      this.getPlaylistTracks();
    });
  }

  getPlaylistById() {
    this.playlistService.getPlaylistById(this.playlistId).subscribe((data: any) => {
      this.playlist = data;
      this.isHeaderLoaded = true;
    });
  }

  getPlaylistTracks() {
    this.playlistService.getPlaylistTracks(this.playlistId).subscribe((data: any) => {
      data.forEach((track: any) => {
        track.artists = track.artists.map((artist: any) => {
          // if artist is not in artists array, add him with counter 1, else increment counter
          if (!this.artists[artist]) {
            this.artists[artist] = 1;
          } else {
            this.artists[artist]++;
          }
          return artist;
        }).join(', ');
        
        // display dates to clearer format
        track.addedAt = new Date(track.addedAt).toLocaleDateString();
      });
      this.playlistTracks = data;

      // get top 3 artists
      this.topArtists = Object.keys(this.artists).sort((a, b) => this.artists[b] - this.artists[a]).slice(0, 3);
      this.isTracksLoaded = true;
    });
  }

  refreshSpotifyPlaylist() {
    this.spotifyService.isConnected().subscribe((data: any) => {
      this.isSpotifyConnected = data.isConnected
      if (this.isSpotifyConnected) {
        this.spotifyService.getTracks(this.playlistId).subscribe((data: any) => {
          console.log('Playlist refreshed', data);
          this.getPlaylistTracks();
        });
      }
    });

  }

}
