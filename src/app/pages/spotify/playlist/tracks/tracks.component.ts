import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SpotifyService } from '../../../../services/platform/spotify.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss'
})
export class TracksComponent implements OnInit, OnChanges {
  @Input() playlistId: number = 0;
  @Input() reloadPlaylist: number = 0;
  tracks: Array<any> = [];
  selectedTracks: Array<string> = [];
  isEveryTrackSelected: boolean = false;

  constructor(private spotifyService: SpotifyService) {
   }

  
  ngOnInit(): void {
    console.log('playlistId', this.playlistId);
    this.getTracks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('playlistId', this.playlistId);
    if (changes['reloadPlaylist'] && changes['reloadPlaylist'].currentValue > changes['reloadPlaylist'].previousValue) {
      this.getTracks();
    }
  }

  getTracks() {
    this.spotifyService.getTracks(this.playlistId).subscribe((data: any) => {
      console.log('Tracks', data);
      this.tracks = data.items;
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
}
