import { type User } from './authentication/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';
import { LoginDto } from './authentication/loginDto';
//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trial-project';
  // selected!:string;
  // user: User = {
  //   username: '',
  //   password: '',
  //   email: ''
  // };
  // loginDto:LoginDto={
  //   password: '',
  //   username: ''
  // }
  // constructor(private authenticationService:AuthenticationService){}
  // change()
  // {
  //   this.selected="register"
  // }
  // register(user: any): void {
    
  //   this.authenticationService.register(user).subscribe({
  //     next: response => {
  //       console.log("Registration successful");
  //       // this.message = 'Registration successful';
  //     },
  //     error: error => {
  //       console.error('Error from server: ', error);
  //       console.log("Registration failed. Please try again later.")
  //       // this.message = 'Registration failed. Please try again later.';
  //     }
  //   });
  // }
  // login(loginDto: any): void {
  //   this.selected="login";
  //   this.authenticationService.login(loginDto).subscribe({
  //     next: (token: string) => {
  //       localStorage.setItem('authToken', token);
  //       //this.message = "Login successful!";
  //       console.log("Login successful!")
  //     },
  //     error: (error) => {
  //       console.error('Error from server: ', error);
  //       //this.message = 'Login failed. Please check your credentials and try again.';
  //       console.log("Login failed. Please check your credentials and try again.");
  //       // Optionally, handle specific error status codes
  //       // if (error.status === 401) {
  //       //   this.message = 'Unauthorized. Please check your credentials.';
  //       // } else if (error.status === 500) {
  //       //   this.message = 'Server error. Please try again later.';
  //       // }
  //     }
  //   });
  // }
  }
  
  
  

 


