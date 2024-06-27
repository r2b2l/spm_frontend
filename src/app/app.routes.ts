import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { AuthGuard } from './guards/authguard';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'create-user', component: CreateUserComponent},
    { path: '', component: AppComponent, canActivate: [AuthGuard], pathMatch: 'full', data: {redirectTo: ''} },
    { path: '**', component: AppComponent, canActivate: [AuthGuard] } // Redirect to home page if no route found
];
