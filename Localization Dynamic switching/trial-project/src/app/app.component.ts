
import { type User } from './authentication/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';
import { LoginDto } from './authentication/loginDto';
//import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = $localize`trial-project`;
  currentLanguage = environment.language;

  switchLanguage(language: string) {
    const currentUrl = window.location.href;
    if (language === 'hi') {
      window.location.href = currentUrl.replace('development', 'development-hi');
    } else {
      window.location.href = currentUrl.replace('development-hi', 'development');
    }
  }
  }
  
  
  

 


