import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TracksModalComponent } from "../../tracks-modal/tracks-modal.component";

@Component({
    selector: 'app-playlist-table',
    imports: [CommonModule, TracksModalComponent],
    templateUrl: './playlist-table.component.html',
    styleUrl: './playlist-table.component.scss',
    providers: [DatePipe]
})
export class PlaylistTableComponent {
  @Input() playlists: any[] = [];
  openModals: any[] = [];

  constructor() { }

  ngOnChanges(): void {
    for (let i = 0; i < this.playlists.length; i++) {
      let playlist = this.playlists[i];
      this.openModals[playlist.id] = 0;
    }
    console.log(this.openModals);
  }

  openPlaylistModal(playlistId: number): void {
    // increment the openModal linked to playlist to give information to relateed app-tracks-modal to open
    console.log('openPlaylistModal', playlistId);
    this.openModals[playlistId]++;
  }
}
