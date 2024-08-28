import { Book } from './../user-input/user-input.model';
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
  bookImageUrl!: string;
  constructor(private functionsService:FunctionsService){}
  @Input({required:true}) buttonName!:string;
  @Input({required:true}) isFunction!:string;
  bookId:number=0;
  bookName:string="";
  message: any;
  postJsonValue: any;
  userInput()
  {
    if(this.isFunction=="GetBookById")
      {

        this.getBookById();
      }
      if(this.isFunction=="GetBookByName")
        {
  
          this.getBookByName();
        }
      else if(this.isFunction=="Delete")
      {
        
        this.deleteBook();
      }
  
  }
  getBookByName() {
    this.functionsService.getBookByName(this.bookName).subscribe({
      next: data => {
        this.postJsonValue = data;
        this.bookId = 0;
  
        // Assign book image to a separate property
        if (this.postJsonValue.bookImage) {
          this.postJsonValue.bookImage = 'data:image/png;base64,' + this.postJsonValue.bookImage;
        }
  
        // Convert postJsonValue to entries to display other properties
        this.entries = Object.entries(this.postJsonValue);
  
        console.log(this.postJsonValue);
        this.message = $localize`Book Retrieved Successfully`;
      },
      error: error => {
        console.error($localize`Error from server: `, error);
        const errorMessage = error.error;
        this.message = errorMessage;
        if (errorMessage == "The book doesn't exist") {
          alert($localize`The book doesn't exist`);
        }
      }
    });
  }
    
  
  getBookById() {
    this.functionsService.getBook(this.bookId).subscribe({
      next: data => {
        this.postJsonValue = data;
        this.bookId = 0;
  
        // Assign book image to a separate property
        if (this.postJsonValue.bookImage) {
          this.postJsonValue.bookImage = 'data:image/png;base64,' + this.postJsonValue.bookImage;
        }
  
        // Convert postJsonValue to entries to display other properties
        this.entries = Object.entries(this.postJsonValue);
  
        console.log(this.postJsonValue);
        this.message = $localize`Book Retrieved Successfully`;
      },
      error: error => {
        console.error($localize`Error from server: `, error);
        const errorMessage = error.error;
        this.message = errorMessage;
        if (errorMessage == "The book doesn't exist") {
          alert($localize`The book doesn't exist`);
        }
      }
    });
  }
  
  
  deleteBook() {
    this.functionsService.deleteBook(this.bookId).subscribe({
      next: () => {
        this.bookId = 0;
        this.message =$localize`Book Deleted Successfully`;
      },
      error: error => {
        console.error($localize`Error from server: `, error);
        const errorMessage = error.error;
        this.message = errorMessage;
        if(errorMessage=="The book doesn't exist.")
        {
          alert($localize`The book doesn't exist.`);
        }
      }
    });
  }
}
