import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TracksComponent } from '../playlist/tracks/tracks.component';
import { TrackService } from '../../../services/track/track.service';

@Component({
    selector: 'app-tracks-modal',
    imports: [TracksComponent],
    templateUrl: './tracks-modal.component.html',
    styleUrl: './tracks-modal.component.scss'
})
export class TracksModalComponent implements OnChanges {
  @Input() openModal: number = 0;
  @Input() playlist: any;
  playlistTracksActives: Array<any> = [];
  playlistTracksReload: Array<any> = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['openModal']) {
      console.log('openModal', this.openModal);
      if (this.openModal > 0) {
        console.log('openPlaylistModal', this.playlist.id);
        this.openPlaylistModal(this.playlist.id);
      }
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

  reloadPlaylist(playlistId: any): void {
    console.log('reloadPlaylist', playlistId);
    if (!this.playlistTracksReload[playlistId]) {
      this.playlistTracksReload[playlistId] = 0;
    }

    this.playlistTracksReload[playlistId]++;
    console.log(this.playlistTracksReload[playlistId]);
  }

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
}
