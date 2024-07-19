import { HeaderComponent } from './header/header.component';
import{NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import{BrowserModule} from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
//import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations:[AppComponent],
    bootstrap:[AppComponent],
    imports:[BrowserModule,CommonModule,RouterOutlet, HelloComponent],
    //schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule{

}