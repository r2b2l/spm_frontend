import { Component, inject, OnInit } from '@angular/core';
import { PlaylistService } from '../../../services/playlist/playlist.service';

@Component({
    selector: 'app-tracks-counter',
    imports: [],
    templateUrl: './tracks-counter.component.html',
    styleUrl: './tracks-counter.component.scss'
})
export class TracksCounterComponent implements OnInit {
  private playlistService: PlaylistService = inject(PlaylistService);
  // tracks counter
  public tracksCount = 0;

  ngOnInit(): void {
    this.playlistService.getAllracksCount().subscribe((data: any) => {
      this.animateCounter(data.totalTracks);
    });
  }

  /**
   * Animates the counter from 0 to the target number.
   * @param target Le nombre cible à atteindre
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
      this.tracksCount = current;
    }, stepTime);
  }

}
