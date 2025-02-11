import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TracksComponent } from '../tracks/tracks.component';

@Component({
  selector: 'app-playlist-table',
  standalone: true,
  imports: [CommonModule, TracksComponent],
  templateUrl: './playlist-table.component.html',
  styleUrl: './playlist-table.component.scss',
  providers: [DatePipe]
})
export class PlaylistTableComponent {
  @Input() playlists: any[] = [];
  playlistTracksActives: Array<boolean> = [];
  playlistTracksReload: Array<number> = [];

  triggerModal(): void {
    console.log('triggerModal');
    const modal = document.getElementById('import');
    // Check if modal element exists before removing the 'hidden' class
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.remove('opacity-0');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  closeModal(): void {
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

  openPlaylistModal(playlistId: number): void {
    const modal = document.getElementById('modal-' + playlistId);
    // Check if modal element exists before removing the 'hidden' class
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.remove('opacity-0');
      modal.setAttribute('aria-hidden', 'false');

      // Set the initiate track list component to true
      this.playlistTracksActives[playlistId] = true;
    }
  }

  closePlaylistModal(playlistId: number): void {
    const modal = document.getElementById('modal-' + playlistId);
    // Check if modal element exists before adding the 'hidden' class
    if (modal) {
      modal.classList.add('opacity-0');
      modal.setAttribute('aria-hidden', 'true');
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 500);

      this.playlistTracksActives[playlistId] = false;
    }
  }

  reloadPlaylist(playlistId: number): void {
    this.playlistTracksReload[playlistId]++;
  }
}
