import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SpotifyService } from '../../../../services/platform/spotify.service';
import { CommonModule, DatePipe } from '@angular/common';
import { PlaylistService } from '../../../../services/playlist/playlist.service';
import { TrackService } from '../../../../services/track/track.service';
import { TablePlaceholderComponent } from '../../../placeholders/table-placeholder/table-placeholder.component';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [CommonModule, TablePlaceholderComponent],
  providers: [DatePipe],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss'
})
export class TracksComponent implements OnInit, OnChanges {
  @Input() playlistId: string = '';
  @Input() reloadPlaylist: number = 0;
  isLoading: boolean = false;
  tracks: Array<any> = [];
  selectedTracks: Array<string> = [];
  isEveryTrackSelected: boolean = false;

  constructor(private spotifyService: SpotifyService, private playlistService: PlaylistService, private trackService: TrackService) {
   }

  
  ngOnInit(): void {
    this.isLoading = true;
    console.log('playlistId', this.playlistId);
    this.getTracks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('playlistId', this.playlistId);
    if (changes['reloadPlaylist'] && changes['reloadPlaylist'].currentValue > changes['reloadPlaylist'].previousValue) {
      this.getTracks();
    }
  }

    /**
   * Initialise loading state and tracks array
   */
    loadTracks(): void {
      this.isLoading = true;
      this.tracks = [];
    }
  
    /**
     * Set loading state to false
     */
    DoneLoadTracks(): void {
      this.isLoading = false;
    }

  /**
   * Get the tracks of the playlist
   * First, get tracks from database
   * If there are no tracks in the database, get tracks from Spotify
   */
  getTracks() {
    this.loadTracks();
    this.getTracksFromDatabase().subscribe((data: any) => {
      this.tracks = data;
      if (this.tracks.length === 0) {
        this.getTracksFromSpotify();
      } else {
        this.DoneLoadTracks();
      }
    });
  }

  getTracksFromDatabase() {
    return this.playlistService.getPlaylistTracks(this.playlistId);
  }

  getTracksFromSpotify() {
    this.spotifyService.getTracks(this.playlistId).subscribe((data: any) => {
      this.tracks = data.items;
      this.DoneLoadTracks();
    });
  }

  selectAll() {
    this.isEveryTrackSelected = !this.isEveryTrackSelected;
    // if this.isEveryTrackSelected is true, put every track in selectedTracks
    if (this.isEveryTrackSelected) {
      this.selectedTracks = this.tracks.map((track: any) => track.id.id);
    } else {
      this.selectedTracks = [];
    }
    console.log(this.selectedTracks);
  }

  selectTrack(trackId: string) {
    // if the track is in selectedTracks, remove it. Otherwise, add it
    if (this.selectedTracks.includes(trackId)) {
      this.selectedTracks = this.selectedTracks.filter((track: string) => track !== trackId);
    } else {
      this.selectedTracks.push(trackId);
    }
  }

  disablePlaylistTracks() {
    if (this.selectedTracks.length > 0) {
      this.spotifyService.disablePlaylistTracks(this.playlistId, this.selectedTracks, true).subscribe((data: any) => {
        this.getTracks();
      });
    }
  }

  activePlaylistTracks() {
    if (this.selectedTracks.length > 0) {
      this.spotifyService.activatePlaylistTracks(this.playlistId, this.selectedTracks, true).subscribe((data: any) => {
        this.getTracks();
      });
    }
  }

  updateTrackDisabled(track: any): void {
    console.log('updateTrackDisabled', track);
    this.trackService.patchTrackSync(this.playlistId, track.id, !track.disabled).subscribe((data: any) => {
      this.getTracks();
    })
  }

  log(o: any) {
    console.log(o);
  }
}
