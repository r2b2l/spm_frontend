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
  tracks: Array<any> = [];

  constructor(private spotifyService: SpotifyService) {
   }

  
  ngOnInit(): void {
    console.log('playlistId', this.playlistId);
    this.getTracks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('playlistId', this.playlistId);
  }

  getTracks() {
    this.spotifyService.getTracks(this.playlistId).subscribe((data: any) => {
      console.log('Tracks', data);
      this.tracks = data.items;
    });
  }
}
