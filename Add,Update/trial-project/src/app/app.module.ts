import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FunctionsModule } from './functions/functions.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations:[
      AppComponent, 
      HeaderComponent
    ],
    imports: [
      HttpClientModule,
      BrowserModule,
      FunctionsModule
    ],
    bootstrap:[AppComponent]
})

export class AppModule{}