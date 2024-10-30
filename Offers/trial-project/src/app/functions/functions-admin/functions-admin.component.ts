import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FunctionsService } from '../functions.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../user-input/user-input.model';
import { APP_CONSTANTS } from '../../shared/constants';

@Component({
  selector: 'app-functions-admin',
  templateUrl: './functions-admin.component.html',
  styleUrls: ['./functions-admin.component.css']
})
export class FunctionsAdminComponent implements OnInit {


  searchKey: string="";
  page!: string;
goHome() {
  this.isFunction="Home"
}
  displayedColumns: string[] = [ 'bookName', 'bookAuthor', 'noOfBook', 'price','bookImage','description','offerPrice', 'actions'];
  displayedColumn: string[] = [ 'book Name', 'book Author', 'no. Of Book', 'price','book Image','description','offer Price', 'actions'];
  dataSource!: MatTableDataSource<any>;
  pageSize = 10;
  currentPage = 0;  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('file') fileInput!: ElementRef;
  username: any;
  getJsonValue: any;
  isFunction!: string;
  isDialogOpen:boolean=false;
  buttonName!: string;
  newBook!: Book;
  color:any="#F6E3BA";
  constructor(private functionsService: FunctionsService,private toastr:ToastrService,private router: Router,private route: ActivatedRoute,public jwtHelper: JwtHelperService) {}  // Inject the FunctionsService

  ngOnInit(): void {
    this.isFunction = "Home";
    this.route.queryParams.subscribe(params => {
      this.username = params['name'];
      console.log(this.username);
   });

    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        // const decodedToken = this.jwtHelper.decodeToken(token);
        // this.username = decodedToken.username; 
        //this.role=decodedToken.role;
        
        if (this.jwtHelper.isTokenExpired(token)) {
          localStorage.removeItem("authToken");
          this.router.navigate(['/authentication']);
        } 
        else {
          //this.getBooks();
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
  goUserPage() {
    this.router.navigate(['/user'],{ queryParams: {name: this.username }});
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
        const errorMessage = error.error ;
        //this.message=errorMessage;
        //alert(errorMessage);
        this.toastr.error(errorMessage);
        console.log(errorMessage);
      }
    })
  }
  getSales() {
    this.functionsService.getSales().subscribe({
      next: (data) => {
        this.isFunction="GetSales";
        this.getJsonValue = data;
      },
      error: (error) => {
        console.error($localize`Error from server: `, error);
        
        // Extract the custom error message from the backend
        const errorMessage = error.error;
        //this.message=errorMessage;
        //alert(errorMessage);
        this.toastr.error(errorMessage);
        console.log(errorMessage);
      }
    });
  }
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/authentication']);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  getBooks(): void {
    this.isFunction="GetBooks";
    this.functionsService.getBooksAdmin().subscribe(
      (books: any[]) => {
        this.dataSource = new MatTableDataSource(books);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
       (error) => {
        console.error($localize`Error from server: `, error);
        
        // Extract the custom error message from the backend
        const errorMessage = error.error ;
        //this.message=errorMessage;
        //alert(errorMessage);
        this.toastr.error(errorMessage);
        console.log(errorMessage);
      }
    );
  }
  deleteBook(bookId:number){
    this.functionsService.deleteBook(bookId).subscribe({
      next: () => {
        this.toastr.success(APP_CONSTANTS.book_delete_success)
        //this.message =$localize`Book Deleted Successfully`;
      },
      error: error => {
        console.error($localize`Error from server: `, error);
        const errorMessage = error.error;
        this.toastr.error(errorMessage);
      }
    });
  }

  base64ToBinaryString(base64: string) {
    // Decode the base64 string to a binary string
    const binaryString = window.atob(base64);

    return binaryString; // This is the binary string
}

  saveChanges(book: Book): void {
      // book.bookImage = this.base64ToBinaryString(book.bookImage);
      const formData = this.createFormData(book);
      console.log(book);
      this.functionsService.updateBook(formData).subscribe({
        next: () => {
          console.log($localize`Book updated successfully`);
          this.toastr.success(APP_CONSTANTS.update_success)
          this.getBooks();
        },
        error: error => {
          console.error($localize`Error updating book: `, error);
          const errorMessage = error.error;
          this.toastr.error(errorMessage);
        }
      });
    
  }
  createFormData(book:Book): FormData {
    const formData = new FormData();
    formData.append('bookId', book.bookId.toString());
    formData.append('bookName', book.bookName);
    formData.append('bookAuthor', book.bookAuthor);
    formData.append('noOfBook', book.noOfBook.toString());
    formData.append('price', book.price.toString());
    formData.append('description', book.description.toString());
   // formData.append('description',book.)
    console.log(book.bookImage);
    // Assuming bookImage is a file object or needs to be treated as such
    if (book.bookImage) {
      formData.append('bookImage', book.bookImage);
    }
    else {
      console.error('Book image is missing');
    }
    console.log(formData)
    return formData;
  }
  
  onFileSelected(event: Event, book: Book): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        book.bookImage = input.files[0];
    }
  }
  triggerFileUpload(element: any) {
    this.fileInput.nativeElement.click();
  }
  public onAddBook()
    {
      //this.isFunction="Add";
      this.buttonName=$localize`Add`;
      this.page="Add";
    }
  
    getBooksInPages() {
       this.isFunction="GetInPages";   
    }
    // deleteBook() {
    //   this.buttonName=$localize`Delete`;
    //   this.isFunction="Delete";      
    // }
    updateBook() {
      this.buttonName=$localize`Update`;
      this.isFunction="Update";   
    }
    bulkUpload() {
      this.page="BulkUpload"
    
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
          this.toastr.error(errorMessage);
          //this.message=errorMessage;
          //alert(errorMessage);
          console.log(errorMessage);
        }
      });   
   }
   onClose()
   {
     this.page="";
     this.getBooks();
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
          //this.message=errorMessage;
          //alert(errorMessage);
          this.toastr.error(errorMessage);
          console.log(errorMessage);
        }
      });
    }
  
}
