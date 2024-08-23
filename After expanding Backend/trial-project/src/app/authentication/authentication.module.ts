import { AuthenticationService } from './authentication.service';
import { AuthenticationComponent } from './authentication.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from "@auth0/angular-jwt";

@NgModule(
    {
        declarations:[
            AuthenticationComponent,
        ],
        imports:[
            FormsModule,
            CommonModule,
            NgIf,
            NgFor,
            JwtModule
        ],
        exports:[],
        providers: [ {
            provide: JWT_OPTIONS,
            useValue: JWT_OPTIONS
          },JwtHelperService] 
    }
)
export class AuthenticationModule{
    
}