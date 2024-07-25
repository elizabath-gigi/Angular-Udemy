import { NgModule } from "@angular/core";
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//import {type Book} from "./user-input/user-input.model"
import { FunctionsComponent } from './functions.component';
import { UserInputComponent } from "./user-input/user-input.component";
import { NgIf } from "@angular/common";

@NgModule({
  declarations: [
    FunctionsComponent,
    UserInputComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    NgIf
  ],
  exports: [
    FunctionsComponent
  ],
  providers: [] 
})

export class FunctionsModule {}