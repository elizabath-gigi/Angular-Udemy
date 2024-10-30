import { FunctionsUserComponent } from './functions/functions-user/functions-user.component';
import { Routes } from '@angular/router';
import { FunctionsComponent } from './functions/functions.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuard } from './authentication/auth.guard';
import { CartComponent } from './functions/cart/cart.component';
import { FunctionsAdminComponent } from './functions/functions-admin/functions-admin.component';
import { HomeComponent } from './functions/home/home.component';
import { GetBooksComponent } from './functions/get-books/get-books.component';
import { BorrowlistComponent } from './functions/borrowlist/borrowlist.component';

export const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'en', component: AuthenticationComponent },
  { path: 'hi', component: AuthenticationComponent },
  { path:'cart',component:CartComponent},
  { path: 'admin', component: FunctionsAdminComponent,canActivate: [AuthGuard]},
  { path:'authentication',component:AuthenticationComponent},
  { path:'user',component:FunctionsUserComponent,canActivate: [AuthGuard],children:[
    { path:'books',component:GetBooksComponent},
    { path:'home',component:HomeComponent},
    { path:'cart',component:CartComponent},
    { path:'borrow',component:BorrowlistComponent}]
  },
  
  { path:'books',component:GetBooksComponent}
];



