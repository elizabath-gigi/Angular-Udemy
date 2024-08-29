import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FunctionsService } from './functions.service'; 
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrl: './functions.component.css'
})
  
export class FunctionsComponent implements OnInit
 {
  message!: string;
  role: any;
  constructor(private functionsService:FunctionsService,private router: Router,public jwtHelper: JwtHelperService,private route: ActivatedRoute){}
  public isFunction="";
  public buttonName="";
  public getJsonValue: any;
  username: string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.username = params['name'];
      console.log(this.username);
   });
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        if (this.jwtHelper.isTokenExpired(token)) {
          localStorage.removeItem("authToken");
          this.router.navigate(['/authentication']);
        } 
        else {
          const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
          if (expirationDate) {
            const now = new Date();
            const timeout = expirationDate.getTime() - now.getTime();
            setTimeout(() => {
              console.log($localize`Time out`);
              this.logout()
            }, timeout);
          }
        }
      } catch (error) {
        console.error($localize`Invalid token:`, error);
        this.router.navigate(['/authentication']);
      }
    }
  }
  
  // public getJsonValue:any;
  // public postJsonValue:any;
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/authentication']);
  }
  public onAddBook()
    {
      this.buttonName=$localize`Add`;
      this.isFunction="Add";
    }
    public getBooks()
    {
      this.functionsService.getBooks().subscribe({
        next: (data) => {
          this.isFunction = "GetBooks";
          this.getJsonValue = data;
        },
        error: (error) => {
          console.error($localize`Error from server: `, error);
          
          // Extract the custom error message from the backend
          const errorMessage = error.error ? error.error.message || 'Get Books failed.' : 'Get Books failed.';
          this.message=errorMessage;
          //alert(errorMessage);
          console.log(errorMessage);
        }
      });    
    }

    getBooksInPages() {
       this.isFunction="GetInPages";   
    }
    deleteBook() {
      this.buttonName=$localize`Delete`;
      this.isFunction="Delete";      
    }
    updateBook() {
      this.buttonName=$localize`Update`;
      this.isFunction="Update";   
    }
    bulkUpload() {
      this.isFunction="BulkUpload"
    
    }
    getBookById() {
      this.buttonName=$localize`Get`
      this.isFunction="GetBookById";      
    }
    getBookByName() {
      this.buttonName=$localize`Get`
      this.isFunction="GetBookByName";      
    }
    deleteUser() {
      this.isFunction="DeleteUser";
      this.buttonName=$localize`Delete User`;
    }
    getBorrowList() {
      this.functionsService.getBorrowList().subscribe({
        next: (data) => {
          this.isFunction="GetBorrowList";
          this.getJsonValue = data;
          console.log(this.getJsonValue);
        },
        error: (error) => {
          console.error($localize`Error from server: `, error);
          
          // Extract the custom error message from the backend
          const errorMessage = error.error;
          this.message=errorMessage;
          //alert(errorMessage);
          console.log(errorMessage);
        }
      });   
   }
    getUserByUsername() {
      this.isFunction="GetUserByUsername";
      this.buttonName=$localize`Get User`;
    }
    getUserById() {
      this.isFunction="GetUserById";
      this.buttonName=$localize`Get User`;
    }
    getUsers() {
      this.functionsService.getUsers().subscribe({
        next: (data) => {
          this.isFunction="GetUsers";
          this.getJsonValue = data;
        },
        error: (error) => {
          console.error($localize`Error from server: `, error);
          
          // Extract the custom error message from the backend
          const errorMessage = error.error;
          this.message=errorMessage;
          //alert(errorMessage);
          console.log(errorMessage);
        }
      });
    }
 
}