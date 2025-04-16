import { Component, OnInit } from '@angular/core';
import { CardPlaceholderComponent } from "../placeholders/card-placeholder/card-placeholder.component";
import { PlaylistCounterComponent } from '../widget/playlist-counter/playlist-counter.component';
import { TracksCounterComponent } from '../widget/tracks-counter/tracks-counter.component';

@Component({
    selector: 'app-home',
    imports: [CardPlaceholderComponent, PlaylistCounterComponent, TracksCounterComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
  }
}
