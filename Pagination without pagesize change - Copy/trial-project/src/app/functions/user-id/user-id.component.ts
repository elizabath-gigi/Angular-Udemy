import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-id',
  standalone: false,
  templateUrl: './user-id.component.html',
  styleUrl: './user-id.component.css'
})
export class UserIdComponent {
  entries: [string, any][] = [];
  constructor(private functionsService:FunctionsService){}
  @Input({required:true}) buttonName!:string;
  bookId:number=0;
  message: any;
  postJsonValue: any;
  userInput()
  {
    if(this.buttonName=="Get")
      {

        this.getBook();
      }
      else if(this.buttonName=="Delete")
      {
        
        this.deleteBook();
      }
  
  }
  getBook() {
    this.functionsService.getBook(this.bookId).subscribe({
      next: data => {
        this.postJsonValue = data;
        this.bookId = 0;
        this.entries = Object.entries(this.postJsonValue);
        this.message = "Book Retrieved Successfully";
      },
      error: error => {
        console.error('Error from server: ', error);
        // Extract the custom error message from the backend
        const errorMessage = error.error;
        this.message=errorMessage;
        alert(errorMessage);
        console.log(errorMessage);
      }
    });
  }
  deleteBook() {
    this.functionsService.deleteBook(this.bookId).subscribe({
      next: () => {
        this.bookId = 0;
        this.message = "Book Deleted Successfully";
      },
      error: error => {
        console.error('Error from server: ', error);
        const errorMessage = error.error;
        this.message = errorMessage;
        alert(errorMessage);
        console.log(errorMessage);
      }
    });
  }
}
