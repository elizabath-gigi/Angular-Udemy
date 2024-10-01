import { provideRouter, RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FunctionsModule } from './functions/functions.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr'; 

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthenticationModule } from './authentication/authentication.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
      FunctionsModule,
      CommonModule,
      FormsModule,
      RouterModule.forRoot(routes),
      TranslateModule.forRoot(),
      BrowserModule,
      BrowserAnimationsModule, 
      ToastrModule.forRoot({
        timeOut: 3000, 
        positionClass: 'toast-bottom-center', 
        preventDuplicates: true, 
        closeButton: true, 
        progressBar: true, 
      })
    ],
    bootstrap:[AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
      { provide: HTTP_INTERCEPTORS, 
        useClass: AuthInterceptor, 
        multi: true },
        TranslateService,
        provideAnimationsAsync()
    ],
})

export class AppModule{}