import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './loginDto';
import { Router } from '@angular/router';
import { ResetDto } from './resetDto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './user.model';


@Component({
  selector: 'app-authentication',
  standalone: false,
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit{
  language!: string;
  username: any;
  ngOnInit(): void {
    const path = window.location.pathname; 
    const segments = path.split('/');  
    this.language = segments[1]; 
    console.log(this.language);
         
  }
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
  role: any;
  constructor(private authenticationService:AuthenticationService,private router: Router,public jwtHelper: JwtHelperService){}
  
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
    if (loginDto.username == "" || loginDto.password == "") {
      alert($localize`All Fields are required`);
    } 
    else {
      this.authenticationService.login(loginDto).subscribe({
        next: (token: string) => {
          console.log('Token received:', token);
          localStorage.setItem('authToken', token);
          const decodedToken = this.jwtHelper.decodeToken(token);
          this.role = decodedToken.role;
          if (this.language == "en") {
            this.username = decodedToken.username;
            if (this.role == "User") {
              console.log(this.username);
              this.router.navigate(['/user'],{ queryParams: {name: this.username }});
              console.log("Login successful as User!");
            } else if (this.role == "Admin") {
              console.log(this.username);
              this.router.navigate(['/admin'],{ queryParams: {name: this.username }});
              console.log("Login successful as Admin!");
            }
          } 
          else if (this.language == "hi") {
            this.username = decodedToken.username;
            this.authenticationService.getNameInHindi(this.username).subscribe({
              next: (response) => {
                this.username = response;
                if (this.role == "User") {
                  console.log(this.username);
                  this.router.navigate(['/user'],{ queryParams: {name: this.username }});
                  console.log("Login successful as User!");
                } else if (this.role == "Admin") {
                  console.log(this.username);
                  this.router.navigate(['/admin'],{ queryParams: {name: this.username }});
                  console.log("Login successful as Admin!");
                }
              },
              error: (error) => {
                console.error('Error from server: ', error);
                const errorMessage = error.error.message || 'An error occurred while fetching the name in Hindi.';
                console.log(errorMessage);
              }
            });
          }
  
          
        },
        error: (error) => {
          console.error('Error from server: ', error);
  
          const errorMessage = error.error;
  
          if (errorMessage == "Login Failed.") {
            alert($localize`Login Failed.`);
          }
        }
      });
    console.log("hi")
    }
  }
  
  reset(resetDto: any): void {
    if(resetDto.username==""||resetDto.oldPassword==""||resetDto.newPassword=="")
      {
        alert($localize`All Fields are required`);
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
          
          const errorMessage = error.error 
          
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
