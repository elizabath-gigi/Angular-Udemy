import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FunctionsModule } from './functions/functions.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

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
    bootstrap:[AppComponent],
    providers: [
      provideAnimationsAsync()
    ]
})

export class AppModule{}