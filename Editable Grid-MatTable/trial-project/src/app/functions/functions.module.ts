
import { FunctionsService } from "./functions.service";
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from "@angular/core";
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule} from "@angular/common";
import { ToastrModule } from 'ngx-toastr';

import { FunctionsUserComponent } from './functions-user/functions-user.component';
import { FunctionsComponent } from './functions.component';
import { UserInputComponent } from "./user-input/user-input.component";
import { NgIf,NgFor } from "@angular/common";
import { UserIdComponent } from "./user-id/user-id.component";
import { MessageComponent } from "./message/message.component";
import { UserTableComponent } from './user-table/user-table.component';
import { UserPagesComponent } from './user-pages/user-pages.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserFileComponent } from "./user-file/user-file.component";
import { JWT_OPTIONS, JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { GetUsersComponent } from "./get-users/get-users.component";
import { GetUserComponent } from "./get-user/get-user.component";
import { BorrowlistComponent } from "./borrowlist/borrowlist.component";
import { GetBooksComponent } from "./get-books/get-books.component";
import { CartComponent } from "./cart/cart.component";
import { BorrowComponent } from "./borrow/borrow.component";
import { FunctionsAdminComponent } from "./functions-admin/functions-admin.component";
import { BrowserModule } from "@angular/platform-browser";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    FunctionsComponent,
    UserInputComponent,
    UserIdComponent,
    MessageComponent,
    UserTableComponent,
    UserPagesComponent,
    UserFileComponent,
    FunctionsUserComponent,
    FunctionsAdminComponent,
    GetUsersComponent,
    GetUserComponent,
    BorrowlistComponent,
    GetBooksComponent,
    CartComponent,
    BorrowComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    JwtModule,
    BrowserModule,
    ToastrModule.forRoot({
      timeOut: 3000, 
      positionClass: 'toast-bottom-center', 
      preventDuplicates: true, 
      closeButton: true, 
      progressBar: true, 
    })
    
],
  exports: [
    FunctionsComponent
  ],
  providers: [ {
    provide: JWT_OPTIONS,
    useValue: JWT_OPTIONS
  },JwtHelperService] 
})

export class FunctionsModule {}