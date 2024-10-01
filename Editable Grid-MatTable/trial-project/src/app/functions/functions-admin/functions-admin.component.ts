import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FunctionsService } from '../functions.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../user-input/user-input.model';

@Component({
  selector: 'app-functions-admin',
  templateUrl: './functions-admin.component.html',
  styleUrls: ['./functions-admin.component.css']
})
export class FunctionsAdminComponent implements OnInit {
  displayedColumns: string[] = ['bookId', 'bookName', 'bookAuthor', 'noOfBook', 'price','bookImage', 'actions'];
  dataSource!: MatTableDataSource<any>;
  pageSize = 10;  // Default page size
  currentPage = 0;  // Default starting page

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('file') fileInput!: ElementRef;
  username: any;
  getJsonValue: any;
  isFunction!: string;
  buttonName!: string;

  constructor(private functionsService: FunctionsService,private toastr:ToastrService,private router: Router,private route: ActivatedRoute,public jwtHelper: JwtHelperService) {}  // Inject the FunctionsService

  ngOnInit(): void {
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
          this.getBooks();
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
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/authentication']);
  }
  getBooks(): void {
    this.functionsService.getBooks().subscribe(
      (books: any[]) => {
        this.dataSource = new MatTableDataSource(books);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error fetching books:', error);
      }
    );
  }
  deleteBook(bookId:number){
    this.functionsService.deleteBook(bookId).subscribe({
      next: () => {
        this.toastr
        //this.message =$localize`Book Deleted Successfully`;
      },
      error: error => {
        console.error($localize`Error from server: `, error);
        const errorMessage = error.error;
        //this.message = errorMessage;
        if(errorMessage=="The book doesn't exist.")
        {
          alert($localize`The book doesn't exist.`);
        }
      }
    });
  }

  saveChanges(book: Book): void {
    
      const formData = this.createFormData(book);
      console.log(book);
      this.functionsService.updateBook(formData).subscribe({
        next: () => {
          console.log($localize`Book updated successfully`);
          this.getBooks();
        },
        error: error => {
          console.error($localize`Error updating book: `, error);
          this.handleError(error);
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
    console.log(book.bookImage);
    // Assuming bookImage is a file object or needs to be treated as such
    if (book.bookImage) {
      formData.append('bookImage', book.bookImage);
    }
    console.log(formData)
    return formData;
  }
  private handleError(error: any): void {
    const errorMessage = error.error;
    //this.message = errorMessage;
    if (errorMessage === "The book doesn't exist.") {
      alert($localize`The book doesn't exist.`);
    } 
    // else {
    //   alert(errorMessage);
    // }
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
      this.buttonName=$localize`Add`;
      this.isFunction="Add";
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
          //this.message=errorMessage;
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
          //this.message=errorMessage;
          //alert(errorMessage);
          console.log(errorMessage);
        }
      });
    }
  
}
