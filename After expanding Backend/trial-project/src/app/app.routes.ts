import { FunctionsUserComponent } from './functions/functions-user/functions-user.component';
import { Routes } from '@angular/router';
import { FunctionsComponent } from './functions/functions.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuard } from './authentication/auth.guard';

export const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'en', component: AuthenticationComponent },
  { path: 'hi', component: AuthenticationComponent },
  { path: 'admin', component: FunctionsComponent,canActivate: [AuthGuard]},
  { path:'authentication',component:AuthenticationComponent},
  { path:'user',component:FunctionsUserComponent,canActivate: [AuthGuard]}
];



