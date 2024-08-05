import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './loginDto';
import { User } from './user.model';
import { Router } from '@angular/router';
import { ResetDto } from './resetDto';

@Component({
  selector: 'app-authentication',
  standalone: false,
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  
  selected:string="login";
  user: User = {
    username: '',
    password: '',
    email: ''
  };
  loginDto:LoginDto={
    password: '',
    username: ''
  };
  resetDto:ResetDto={
    oldPassword: '',
    newPassword:'',
    username: ''
  }
  constructor(private authenticationService:AuthenticationService,private router: Router){}
  
  changeToRegister()
  {
    this.selected="register"
  }
  changeToLogin()
  {
    this.selected="login"
  }
  changeToReset()
  {
    this.selected="reset"
  }
  register(user: any): void {
    
    this.authenticationService.register(user).subscribe({
      next: () => {
        console.log("Registration successful");
        // this.message = 'Registration successful';
        this.selected="login"
      },
      error: (error) => {
        console.error('Error from server: ', error);
        // Extract the custom error message from the backend
        const errorMessage = error.error 
        // Display the error message as an alert
        alert(errorMessage);
        console.log(errorMessage);
      }
    });
  }
  login(loginDto: any): void {
  this.authenticationService.login(loginDto).subscribe({
    next: (token: string) => {
      localStorage.setItem('authToken', token);
      this.router.navigate(['/functions']);
      console.log("Login successful!");
    },
    error: (error) => {
      console.error('Error from server: ', error);
      // Extract the custom error message from the backend
      const errorMessage = error.error 
      // Display the error message as an alert
      alert(errorMessage);
      console.log(errorMessage);
    }
  });
}
  reset(resetDto: any): void {
    
    this.authenticationService.reset(resetDto).subscribe({
      next: () => {

        console.log("Reset password successful");
        // this.message = 'Registration successful';
        this.selected="login";
      },
      error: (error) => {
        console.error('Error from server: ', error);
        // Extract the custom error message from the backend
        const errorMessage = error.error 
        // Display the error message as an alert
        alert(errorMessage);
        console.log(errorMessage);
      }
    });
  }
}
