import { Routes } from '@angular/router';
import { FunctionsComponent } from './functions/functions.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuard } from './authentication/auth.guard';

export const routes: Routes = [
  
  { path: '', component: AuthenticationComponent },
  { path: 'functions', component: FunctionsComponent,canActivate: [AuthGuard] },
  { path:'authentication',component:AuthenticationComponent},
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },
  { path: '**', redirectTo: '/authentication' }
];