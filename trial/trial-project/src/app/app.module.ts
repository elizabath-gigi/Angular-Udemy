import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';

// @NgModule({
// declarations:[AppComponent],
//   imports: [BrowserModule, HeaderComponent],
//   bootstrap:[AppComponent]

// })
@NgModule({
    declarations:[AppComponent, HeaderComponent],
      imports: [HttpClientModule,BrowserModule],
      bootstrap:[AppComponent]
    
    })
export class AppModule{
  
  
}