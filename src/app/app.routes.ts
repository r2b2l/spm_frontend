import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { AuthGuard } from './guards/authguard';
import { SpotifyComponent } from './pages/spotify/spotify.component';
import { HomeComponent } from './pages/home/home.component';
// import { AuthResolver } from './services/auth/auth-resolver.service';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'create-user', component: CreateUserComponent},
    { path: 'spotify', component: SpotifyComponent, canActivate: [AuthGuard]},
    { 
        path: '',
        component: HomeComponent, 
        canActivate: [AuthGuard],
        pathMatch: 'full', 
    },
    { path: '**', redirectTo: '', canActivate: [AuthGuard] } // Redirect to home page if no route found
];
