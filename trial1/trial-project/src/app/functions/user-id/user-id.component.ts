import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FunctionsService } from '../functions.service';

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
   getBook()
  {
     this.functionsService.getBook(this.bookId).subscribe(data=>{
          this.postJsonValue=data;
          console.log(this.postJsonValue);
          this.bookId=0;
          this.entries = Object.entries(this.postJsonValue);
          this.message="Book Retrieved Successfully";
    });
    
    
    
  }
  deleteBook()
  {
    this.functionsService.deleteBook(this.bookId);
    this.bookId=0;  
    this.message="Book Deleted Successfully";
    
  }
}
