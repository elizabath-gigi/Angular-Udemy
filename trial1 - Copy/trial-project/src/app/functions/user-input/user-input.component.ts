import { HttpHeaders,HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';


export type Book = {
  bookName: string;
  bookAuthor: string;
  noOfBook: number;
  price: string;
};

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  constructor(private http:HttpClient){

  }

  book: Book = {
  bookName: '',
  bookAuthor: '',
  noOfBook: 0,
  price: ''
};
postJsonValue: any;


  addBook()
    {
      const header=new HttpHeaders({
      contentsType:"application/json"
    })
    this.http.post('https://localhost:7220/api/Library/addBook',this.book,{headers:header}).subscribe((data)=>{
      this.postJsonValue=data;
      alert("Added Successfully");
    });
    
  }
    }
    
  
  




