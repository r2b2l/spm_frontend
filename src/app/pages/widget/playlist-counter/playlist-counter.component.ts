import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../../services/playlist/playlist.service';

@Component({
  selector: 'app-playlist-counter',
  standalone: true,
  imports: [],
  templateUrl: './playlist-counter.component.html',
  styleUrl: './playlist-counter.component.scss'
})
export class PlaylistCounterComponent implements OnInit {
  public playlistsCount: number = 0;

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.playlistService.getPlaylistsCount().subscribe((data: any) => {
      this.animateCounter(data.count);
    });
  }


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