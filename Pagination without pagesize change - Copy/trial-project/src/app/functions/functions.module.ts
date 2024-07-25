

import { FunctionsService } from "./functions.service";
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from "@angular/core";
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule} from "@angular/common";

//import {type Book} from "./user-input/user-input.model"
import { FunctionsComponent } from './functions.component';
import { UserInputComponent } from "./user-input/user-input.component";
import { NgIf,NgFor } from "@angular/common";
import { UserIdComponent } from "./user-id/user-id.component";
import { MessageComponent } from "./message/message.component";
import { UserTableComponent } from './user-table/user-table.component';
import { UserPagesComponent } from './user-pages/user-pages.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    FunctionsComponent,
    UserInputComponent,
    UserIdComponent,
    MessageComponent,
    UserTableComponent,
    UserPagesComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    NgIf,
    NgFor,
    CommonModule,
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    BrowserAnimationsModule

],
  exports: [
    FunctionsComponent
  ],
  providers: [] 
})

export class FunctionsModule {}