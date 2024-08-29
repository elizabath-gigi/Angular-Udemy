import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FunctionsService } from '../functions.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-functions-admin',
  templateUrl: './functions-admin.component.html',
  styleUrls: ['./functions-admin.component.css']
})
export class FunctionsAdminComponent implements OnInit {
  displayedColumns: string[] = ['bookId', 'bookName', 'bookAuthor', 'noOfBook', 'price', 'actions'];
  dataSource!: MatTableDataSource<any>;
  pageSize = 10;  // Default page size
  currentPage = 0;  // Default starting page

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  username: any;

  constructor(private functionsService: FunctionsService,private router: Router,private route: ActivatedRoute,public jwtHelper: JwtHelperService) {}  // Inject the FunctionsService

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
        this.getBooks();
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
  

  saveChanges(book: any): void {
    
      const formData = this.createFormData(book);
  
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
  createFormData(book: any): FormData {
    const formData = new FormData();
    formData.append('bookId', book.bookId.toString());
    formData.append('bookName', book.bookName);
    formData.append('bookAuthor', book.bookAuthor);
    formData.append('noOfBook', book.noOfBook.toString());
    formData.append('price', book.price.toString());
  
    // Assuming bookImage is a file object or needs to be treated as such
    if (book.bookImage) {
      formData.append('bookImage', book.bookImage);
    }
  
    return formData;
  }
  private handleError(error: any): void {
    const errorMessage = error.error;
    //this.message = errorMessage;
    if (errorMessage === "The book doesn't exist.") {
      alert($localize`The book doesn't exist.`);
    } else {
      alert(errorMessage);
    }
  }
  
}
