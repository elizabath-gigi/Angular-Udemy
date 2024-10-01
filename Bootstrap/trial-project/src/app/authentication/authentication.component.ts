import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './loginDto';
import { Router } from '@angular/router';
import { ResetDto } from './resetDto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './user.model';
import { APP_CONSTANTS } from '../shared/constants';


@Component({
  selector: 'app-authentication',
  standalone: false,
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit{
  message!:string;
  language!: string;
  username: any;
  Email: any;
  Otp!: string;
  newPassword!: string;
  
  otpConfig = {
    length: 6,
    inputClass: 'form-control',
    isPasswordInput: true,  
    inputStyles: {
      width: '40px',
      height: '40px',
      'font-size': '18px',
      'border-radius': '8px',
      'border': '1px solid #ccc'
  }
};
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
  constructor(private authenticationService:AuthenticationService,private router: Router,private toastr:ToastrService,public jwtHelper: JwtHelperService){}
  
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
    this.selected="forgot"
  }
  

  onOtpChange(otp: string) {
    this.Otp = otp;
    console.log(this.Otp);
  }


  sendEmail() {
    if(this.Email=="")
      {
        this.toastr.warning(APP_CONSTANTS.required);
      }
      else{
        this.authenticationService.sendEmail(this.Email).subscribe({
          next: () => {
           this.selected="validate"
          },
          error: (error) => {
            console.error($localize`Error from server:`, error);
            
            const errorMessage = error.error 
            
            this.toastr.error(errorMessage);
          }
        });
  
      }
    }
  validateOtp() {
   this.selected="validate";
  //  if (this.Otp.length === 6)
  //   {
  //     this.toastr.warning(APP_CONSTANTS.required);
  //   }
  //   else{
      this.authenticationService.validate(this.Email,this.Otp).subscribe({
        next: () => {
         this.selected="reset"
        },
        error: (error) => {
          console.error($localize`Error from server:`, error);
          
          const errorMessage = error.error 
          
          this.toastr.error(errorMessage);
        }
      });

    // }

  }
  resetPassword() {
    this.selected="reset";
    if(this.newPassword=="")
      {
        this.toastr.warning(APP_CONSTANTS.required);
      }
      else{
        this.authenticationService.resetPassword(this.Email,this.newPassword).subscribe({
          next: () => {
          console.log("reached forgot password");
          this.toastr.success(APP_CONSTANTS.reset_password_success);
          this.selected="login"
          this.newPassword="";
          },
          error: (error) => {
            console.error($localize`Error from server:`, error);
            
            const errorMessage = error.error 
            
            this.toastr.error(errorMessage);
          }
        });
  
      }

  }
  register(user: any): void {
    if(user.username==""||user.password==""||user.email=="")
    {
      this.toastr.warning(APP_CONSTANTS.required);
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
          
          this.toastr.error(errorMessage);
        }
      });

    }
    
  }
  login(loginDto: any): void {
    if (loginDto.username == "" || loginDto.password == "") {
      this.toastr.warning(APP_CONSTANTS.required);
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
          this.toastr.error(errorMessage);
        }
      });
    console.log("hi")
    }
  }
  
  // reset(resetDto: any): void {
  //   if(resetDto.username==""||resetDto.oldPassword==""||resetDto.newPassword=="")
  //     {
  //      this.toastr.warning(APP_CONSTANTS.required)
  //     }
  //   else{
  //     this.authenticationService.reset(resetDto).subscribe({
  //       next: () => {
  
  //         console.log("Reset password successful");
  //         // this.message = 'Registration successful';
  //         this.toastr.success(APP_CONSTANTS.reset_password_success)
  //         this.selected="login";
  //       },
  //       error: (error) => {
  //         console.error('Error from server: ', error);
          
  //         const errorMessage = error.error 
          
  //         this.toastr.error(errorMessage)
  //       }
  //     });
  //   }
    
  // }
}
