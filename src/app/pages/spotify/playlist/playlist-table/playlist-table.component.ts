import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TracksModalComponent } from "../../tracks-modal/tracks-modal.component";

@Component({
  selector: 'app-playlist-table',
  standalone: true,
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


  // playlistTracksActives: Array<boolean> = [];
  // playlistTracksReload: Array<number> = [];

  // triggerModal(): void {
  //   console.log('triggerModal');
  //   const modal = document.getElementById('import');
  //   // Check if modal element exists before removing the 'hidden' class
  //   if (modal) {
  //     modal.classList.remove('hidden');
  //     modal.classList.remove('opacity-0');
  //     modal.setAttribute('aria-hidden', 'false');
  //   }
  // }

  // closeModal(): void {
  //   console.log('closeModal');
  //   const modal = document.getElementById('import');
  //   // Check if modal element exists before adding the 'hidden' class
  //   if (modal) {
  //     modal.classList.add('opacity-0');
  //     modal.setAttribute('aria-hidden', 'true');
  //     setTimeout(() => {
  //       modal.classList.add('hidden');
  //     }, 500);
  //   }
  // }

  openPlaylistModal(playlistId: number): void {
    // increment the openModal linked to playlist to give information to relateed app-tracks-modal to open
    console.log('openPlaylistModal', playlistId);
    this.openModals[playlistId]++;
  }

  // closePlaylistModal(playlistId: number): void {
  //   const modal = document.getElementById('modal-' + playlistId);
  //   // Check if modal element exists before adding the 'hidden' class
  //   if (modal) {
  //     modal.classList.add('opacity-0');
  //     modal.setAttribute('aria-hidden', 'true');
  //     setTimeout(() => {
  //       modal.classList.add('hidden');
  //     }, 500);

  //     this.playlistTracksActives[playlistId] = false;
  //   }
  // }

  // reloadPlaylist(playlistId: number): void {
  //   this.playlistTracksReload[playlistId]++;
  // }
}
