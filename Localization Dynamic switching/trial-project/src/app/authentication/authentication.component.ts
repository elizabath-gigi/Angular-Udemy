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
    userName: '',
    password: '',
    email: '',
    nameHindi: ''
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
    if(user.username==""||user.password==""||user.email=="")
    {
      alert($localize`All Fields are required`);
    }
    else{
      this.authenticationService.register(user).subscribe({
        next: () => {
          console.log($localize`Registration successful`);
          // this.message = 'Registration successful';
          this.selected="login"
        },
        error: (error) => {
          console.error($localize`Error from server:`, error);
          // Extract the custom error message from the backend
          const errorMessage = error.error 
          if(errorMessage=="Registration failed.")
          {
            alert($localize`Registration failed.`);
            console.log(errorMessage);
            //console.log($localize`Registration failed.`);
          }
          else if(errorMessage=="Invalid email format.")
          {
            alert($localize`Invalid email format.`);
            console.log(errorMessage);
            //console.log($localize`Invalid email format.`);
          }
          else if(errorMessage=="Username must be at least 3 characters long.")
          {
            alert($localize`Username must be at least 3 characters long.`);
            console.log(errorMessage);
            //console.log($localize`Invalid email format.`);
          }
          else if(errorMessage=="Password must be at least 6 characters long and must have at least one special character and uppercase letter.")
          {
              alert($localize`Password must be at least 6 characters long and must have at least one special character and uppercase letter.`);
              //console.log($localize`Invalid email format.`);
              console.log(errorMessage);
          }
          //alert(errorMessage);
          //console.log(errorMessage);
        }
      });

    }
    
  }
  login(loginDto: any): void {
    if(loginDto.username==""||loginDto.password=="")
      {
        alert("All Fields are required");
      }
    else{
      this.authenticationService.login(loginDto).subscribe({
        next: (token: string) => {
          localStorage.setItem('authToken', token);
          this.router.navigate(['/functions']);
          //console.log("Login successful!");
        },
        error: (error) => {
          console.error('Error from server: ', error);
          // Extract the custom error message from the backend
          const errorMessage = error.error 
          // Display the error message as an alert
          //alert(errorMessage);
          //console.log(errorMessage);
          if(errorMessage=="Login Failed.")
          {
            alert($localize`Login Failed.`);    
          }         
        }
      });
    }

 
}
  reset(resetDto: any): void {
    if(resetDto.username==""||resetDto.oldPassword==""||resetDto.newPassword=="")
      {
        alert("All Fields are required");
      }
    else{
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
          if(errorMessage=="Password Reset Failed.")
          {
            alert($localize`Password Reset Failed.`)
          }
          //console.log(errorMessage);
        }
      });
    }
    
  }
}
