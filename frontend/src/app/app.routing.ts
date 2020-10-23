import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login';
import { AllMoviesComponent } from './movies/all-movies/all-movies.component';
import { FavoriteMoviesComponent } from './movies/favorite-movies/favorite-movies.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_helpers';
import { AccountDetailsComponent } from './account-details/account-details.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }, //canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'accountdetails', component: AccountDetailsComponent },
  { path: 'allmovies', component: AllMoviesComponent },
  { path: 'favoritemovies', component: FavoriteMoviesComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

export const appRoutingModule = RouterModule.forRoot(routes);
