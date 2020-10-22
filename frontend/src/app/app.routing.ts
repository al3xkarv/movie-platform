import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register/register.component';
// import { AuthGuard } from './_helpers';

const routes: Routes = [
  // { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

export const appRoutingModule = RouterModule.forRoot(routes);
