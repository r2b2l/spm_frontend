import { Component } from '@angular/core';
import { CardPlaceholderComponent } from "../placeholders/card-placeholder/card-placeholder.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardPlaceholderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
