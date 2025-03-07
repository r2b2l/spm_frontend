import { Component, OnInit } from '@angular/core';
import { CardPlaceholderComponent } from "../placeholders/card-placeholder/card-placeholder.component";
import { PlaylistService } from '../../services/playlist/playlist.service';
import { PlaylistCounterComponent } from '../widget/playlist-counter/playlist-counter.component';
import { TracksCounterComponent } from '../widget/tracks-counter/tracks-counter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardPlaceholderComponent, PlaylistCounterComponent, TracksCounterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
