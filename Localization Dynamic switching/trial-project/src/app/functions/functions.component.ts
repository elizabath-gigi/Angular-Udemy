import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FunctionsService } from './functions.service'; 
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.development';


@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrl: './functions.component.css'
})
  
export class FunctionsComponent implements OnInit
 {
  message!: string;
  role: any;
  language: any;
  constructor(private functionsService:FunctionsService,private router: Router,public jwtHelper: JwtHelperService){}
  public isFunction="";
  public buttonName="";
  public getJsonValue: any;
  username: string = '';
  name:any;

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        this.username = decodedToken.username; 
        this.role=decodedToken.role;
        /*this.language=environment.language;
        console.log(this.language);
        if (this.language === 'hi') {
          this.functionsService.getNameInHindi(this.username).subscribe({
            next: (data) => {
               this.name = data;
            },
            error: (err) => {
              console.error('Error fetching book data:', err);
            }
          });
        }*/
        
  
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
    //   try{
    //     this.functionsService.getBooks().subscribe(data=>{
    //       this.isFunction="GetBooks"
    //       this.getJsonValue =data;
    //     })
    //  }
    //  catch(error)
    //  {
    //   console.error('Error from server: ',error);
    //   this.message='Get Books failed.';
    //  }

      
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
    getBook() {
      this.buttonName=$localize`Get`
      this.isFunction="Get";      
    }
 
}