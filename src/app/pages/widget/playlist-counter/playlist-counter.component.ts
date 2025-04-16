import { Component, inject, OnInit } from '@angular/core';
import { PlaylistService } from '../../../services/playlist/playlist.service';

@Component({
    selector: 'app-playlist-counter',
    imports: [],
    templateUrl: './playlist-counter.component.html',
    styleUrl: './playlist-counter.component.scss'
})
/**
 * Composant de compteur de playlists
  * @description Ce composant affiche le nombre total de playlists dans l'application.
 */
export class PlaylistCounterComponent implements OnInit {
  private playlistService: PlaylistService = inject(PlaylistService);
  
  // Compteur de playlists
  public playlistsCount = 0;

  ngOnInit(): void {
    this.playlistService.getPlaylistsCount().subscribe((data: any) => {
      this.animateCounter(data.count);
    });
  }

  /**
   * Animates the counter to the target value
   * @param target Nombre cible à atteindre
   */
  animateCounter(target: number) {
    let current = 0;
    const stepTime = 50; // Durée entre chaque incrémentation
    const increment = Math.ceil(target / 50); // Ajuste la vitesse de l'animation

    const counterInterval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(counterInterval);
      }
      this.playlistsCount = current;
    }, stepTime);
  }
}