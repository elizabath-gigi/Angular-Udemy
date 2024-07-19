import { HttpHeaders,HttpClient} from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';


export type Book = {
  bookName: string;
  bookAuthor: string;
  noOfBook: string;
  price: string;
};

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  @Input({required:true}) buttonName!:string;
  constructor(private http:HttpClient){

  }

  book: Book = {
  bookName: '',
  bookAuthor: '',
  noOfBook:'',
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
  addBook()
    {
      //this.buttonName="Add";
      const header=new HttpHeaders({
      contentsType:"application/json"
    })
    this.http.post('https://localhost:7220/api/Library/addBook',this.book,{headers:header}).subscribe((data)=>{
      this.postJsonValue=data;
      alert("Added Successfully");
    });
    
  }
  updateBook()
  {
    // this.buttonName="Update";
    const header=new HttpHeaders({
      contentsType:"application/json"
    })
    this.http.post('https://localhost:7220/api/Library/updateBook',this.book,{headers:header}).subscribe((data)=>{
      this.postJsonValue=data;
      alert("Added Successfully");
    });
    
  }
}
    

    
  
  
  



