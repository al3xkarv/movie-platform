import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login';
import { AllMoviesComponent } from './movies/all-movies/all-movies.component';
import { FavoriteMoviesComponent } from './movies/favorite-movies/favorite-movies.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard, LoggedGuard } from './helpers';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { MovieUpdateComponent } from './movies/movie-update/movie-update.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuard] },
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
  {
    path: 'allmovies/update',
    component: MovieUpdateComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

export const appRoutingModule = RouterModule.forRoot(routes);
