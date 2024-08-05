import { FunctionsService } from './../functions.service';
import { HttpHeaders,HttpClient} from '@angular/common/http';
import { Component, Input } from '@angular/core';
import {type Book} from "./user-input.model"




@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  constructor(private functionsService:FunctionsService){}
  @Input({required:true}) buttonName!:string;
  message!:string;
  // constructor(private http:HttpClient){

  // }

  
   book: Book = {
    bookId: 0,
    bookName: '',
    bookAuthor: '',
    noOfBook: '',
    price: ''
  };
postJsonValue: any;
// buttonName!:string;
userInput()
{
  if(this.buttonName=="Add")
  {
    // this.buttonName="Add";
    this.addBook();
  }
  else if(this.buttonName=="Update")
  {
    // this.buttonName="Update";
    this.updateBook();
  }
}
addBook() {
  if(this.book.bookAuthor==""||this.book.bookName==""||this.book.noOfBook==""||this.book.price=="")
  {
    alert("All fields are requied")
  }
  else{
    this.functionsService.addBook(this.book).subscribe({
      next: () => {
        this.message = "Added Successfully";
        this.book = {
          bookId: 0,
          bookName: '',
          bookAuthor: '',
          noOfBook: '',
          price: ''
        };
      },
      error: error => {
        console.error('Error from server: ', error);
        const errorMessage = error.error;
          this.message=errorMessage;
          alert(errorMessage);
          console.log(errorMessage)
      }
    });
  }
  
}
  updateBook() {
    if(this.book.bookAuthor==""||this.book.bookName==""||this.book.noOfBook==""||this.book.price==""||this.book.bookId==0)
      {
        alert("All fields are requied")
      }
      else{
        this.functionsService.updateBook(this.book).subscribe({
          next: () => {
            this.message = "Updated Successfully";
            this.book = {
              bookId: 0,
              bookName: '',
              bookAuthor: '',
              noOfBook: '',
              price: ''
            };
          },
          error: error => {
            console.error('Error from server: ', error);
            const errorMessage = error.error;
            this.message=errorMessage;
            alert(errorMessage);
            console.log(errorMessage)
          }
        });
      }
    
  }
  
}
    

    
  
  
  




