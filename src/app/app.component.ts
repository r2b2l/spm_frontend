import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth-service.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit, OnDestroy {
  title = 'spm_frontend';
  isLogged = false;
  routeName = '';
  private authSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.authSubscription = this.authService.authToken$.subscribe(token => {
      this.isLogged = !!token;
    });
  }

  ngOnInit() {
    const authToken = this.authService.authToken;
    this.isLogged = authToken !== null;
    // Subscribe to route changes and update routeName
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumb();
      });
  }

  updateBreadcrumb() {
    // Obtenez l'URL actuelle et divisez-la pour obtenir le dernier segment
    const urlSegments = this.router.url.split('/').filter(segment => segment);
    if (urlSegments.length === 0) {
      this.routeName = 'Accueil';
    } else {
      this.routeName = urlSegments[urlSegments.length - 1];
    }
  }

  toggleCollapse() {
    // Set button aria-expanded attribute to true
    const button = document.getElementById('profileButton');
    if (button) {
      button.setAttribute('aria-expanded', 'true');
    }
    // Set Button icon plus to minus
    const buttonIcon = document.getElementById('profileButtonIcon');
    // Toggle minus and plus icons
    if (buttonIcon) {
      buttonIcon.classList.toggle('fa-plus');
      buttonIcon.classList.toggle('fa-minus');
    }
    // Toggle hidden class on profileCollapse element
    const collapse = document.getElementById('profileCollapse');
    if (collapse) {
      collapse.classList.toggle('hidden');
    }
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
