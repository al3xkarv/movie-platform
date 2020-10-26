﻿import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login';
import { AllMoviesComponent } from './movies/all-movies/all-movies.component';
import { FavoriteMoviesComponent } from './movies/favorite-movies/favorite-movies.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard, LoggedGuard } from './_helpers';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuard] }, //canActivate: [AuthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'accountdetails',
    component: AccountDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'allmovies',
    component: AllMoviesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'favoritemovies',
    component: FavoriteMoviesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'details',
    component: MovieDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

export const appRoutingModule = RouterModule.forRoot(routes);
