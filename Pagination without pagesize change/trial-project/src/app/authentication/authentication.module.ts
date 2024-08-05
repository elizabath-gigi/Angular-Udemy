import { AuthenticationService } from './authentication.service';
import { AuthenticationComponent } from './authentication.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';


@NgModule(
    {
        declarations:[
            AuthenticationComponent,
        ],
        imports:[
            FormsModule,
            CommonModule,
            NgIf,
            NgFor
        ],
        exports:[]
    }
)
export class AuthenticationModule{
    
}