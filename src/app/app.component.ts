import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit, OnDestroy {
  title = 'spm_frontend';
  private authSubscription: Subscription;
  isLogged = false;

  constructor(private authService: AuthService) {
    this.authSubscription = this.authService.authToken$.subscribe(token => {
      this.isLogged = !!token;
    });
  }

  ngOnInit() {
    const authToken = this.authService.authToken;
    this.isLogged = authToken !== null;
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
