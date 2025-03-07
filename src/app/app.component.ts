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
  isLogged: boolean = false;
  routeName = '';
  isLoading: boolean = true;
  private authSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    console.log('AppComponent OnInit');
    this.authSubscription = this.authService.authState$.subscribe(state => {
      console.log('Auth state : ' + state);
      this.isLogged = state;
      this.isLoading = false;
    });
    // Subscribe to route changes and update routeName
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumb();
      });
  }

  updateBreadcrumb() {
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
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
