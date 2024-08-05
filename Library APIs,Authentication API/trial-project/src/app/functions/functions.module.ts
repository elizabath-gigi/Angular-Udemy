

import { FunctionsService } from "./functions.service";
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from "@angular/core";
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule} from "@angular/common";


import { FunctionsComponent } from './functions.component';
import { UserInputComponent } from "./user-input/user-input.component";
import { NgIf,NgFor } from "@angular/common";
import { UserIdComponent } from "./user-id/user-id.component";
import { MessageComponent } from "./message/message.component";
import { UserTableComponent } from './user-table/user-table.component';
import { UserPagesComponent } from './user-pages/user-pages.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserFileComponent } from "./user-file/user-file.component";

@NgModule({
  declarations: [
    FunctionsComponent,
    UserInputComponent,
    UserIdComponent,
    MessageComponent,
    UserTableComponent,
    UserPagesComponent,
    UserFileComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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