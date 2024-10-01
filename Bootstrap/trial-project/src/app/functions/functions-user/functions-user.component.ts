import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FunctionsService } from '../functions.service'; 
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-functions-user',
  standalone: false,
  templateUrl: './functions-user.component.html',
  styleUrl: './functions-user.component.css'
})
export class FunctionsUserComponent implements OnInit{

receiveMessage(noOfBooksInCart: number) {
  this.noOfBooksInCart=noOfBooksInCart;
}

  noOfBooksInCart:number=0;
  message!: string;
  role: any;
  page: string="";
  searchKey: string="";
  constructor(private functionsService:FunctionsService,private toastr:ToastrService,private router: Router,public jwtHelper: JwtHelperService,private route: ActivatedRoute){}
  public isFunction="";
  public buttonName="";
  public getJsonValue: any;
  username: string = '';

  ngOnInit(): void {
    this.isFunction="Home"
    this.route.queryParams.subscribe(params => {
      this.username = params['name'];
      console.log(this.username);
      this.functionsService.ViewCartItems().subscribe({
        next:(data)=>{
          this.noOfBooksInCart=data.length;
        }
      })
   });

    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        // const decodedToken = this.jwtHelper.decodeToken(token);
        // this.username = decodedToken.username; 
        //this.role=decodedToken.role;
        //this.getBooks();
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
  goHome() {
    this.isFunction="Home"
    }
  // public getJsonValue:any;
  // public postJsonValue:any;
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/authentication']);
  }
  onBorrowClick() {
    this.page="Borrow";
  }
  onCartClick() {
     this.page="Cart";
     console.log("Cart")
    // this.router.navigate(['/cart'])
  }
  onClose()
  {
     this.page="";
    // this.router.navigate(['/user'])
  }
  public search()
  {
    this.functionsService.search(this.searchKey).subscribe({
      next:(books)=>{
        this.isFunction = "GetBooks";
        this.getJsonValue = books;
      },
      error: (error) => {
        console.error($localize`Error from server: `, error);
        
        // Extract the custom error message from the backend
        const errorMessage = error.error;
        this.message=errorMessage;
        //alert(errorMessage);
        this.toastr.error(errorMessage);
        console.log(errorMessage);
      }
    })
  }
  onSearchChange() {
    if(this.searchKey!=""){
    this.search()
    }
    else{
     this.getBooks()
    }
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
          const errorMessage = error.error ;
          this.message=errorMessage;
          this.toastr.error(errorMessage);
          //alert(errorMessage);
          console.log(errorMessage);
        }
      });
 
  }
  getBooksInPages() {
    this.isFunction="GetInPages";   
  }
  getBook() {
    this.buttonName=$localize`Get`;
    this.isFunction="Get";      
  }
}
