import { Routes, RouterModule } from '@angular/router';

//import { HomeComponent } from './home';
//import { LoginComponent } from './login';
//import { RegisterComponent } from './register';
//import { AuthGuard } from './_guards';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { LoginComponent } from './login';
import { UserComponent } from './users/users.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'allusers', component: UserComponent },
  //{ path: 'counter', component: CounterComponent },
  //{ path: 'fetch-data', component: FetchDataComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '/register' }
];

export const routing = RouterModule.forRoot(appRoutes);
