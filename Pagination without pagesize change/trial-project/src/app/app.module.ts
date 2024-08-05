import { provideRouter, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FunctionsModule } from './functions/functions.module';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthenticationModule } from './authentication/authentication.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { AuthInterceptor } from './authentication/auth.interceptor';
@NgModule({
    declarations:[
      AppComponent, 
      HeaderComponent
    ],
    imports: [
      HttpClientModule,
      BrowserModule,
      CommonModule,
      FormsModule,
      RouterModule.forRoot(routes),
      ReactiveFormsModule
    ],
    bootstrap:[AppComponent],
    providers: [
      { provide: HTTP_INTERCEPTORS, 
        useClass: AuthInterceptor, 
        multi: true },
    ],
})

export class AppModule{}