import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FunctionsService } from './functions.service'; 

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrl: './functions.component.css'
})
  
export class FunctionsComponent {
  constructor(private functionsService:FunctionsService){}
  public isFunction="";
  public buttonName="";
  public getJsonValue: any;
  // public getJsonValue:any;
  // public postJsonValue:any;
  public onAddBook()
    {
      this.buttonName="Add";
      this.isFunction="Add";
    }
    public getBooks()
    {
      // this.isFunction="GetBooks";
      // console.log(this.isFunction);
      // this.getJsonValue=this.functionsService.getBooks()
      // console.log('books',this.getJsonValue);

      this.functionsService.getBooks().subscribe(data=>{
        this.isFunction="GetBooks";
        //console.log('inside component',s);
        this.getJsonValue =data;
      })
    }
    
    
    
    getBooksInPages() {
      // this.functionsService.getBooksInPages().subscribe(data=>{
      //   this.isFunction="GetInPages";
      //   //console.log('inside component',s);
      //   this.getJsonValue =data;
      // })
      this.isFunction="GetInPages";
      console.log("hi");
   
    }
    deleteBook() {
      this.buttonName="Delete";
      this.isFunction="Delete";      
    }
    updateBook() {
      this.buttonName="Update"
      this.isFunction="Update";   
    }
    addBookFromFile() {
    
    }
    getBook() {
      this.buttonName="Get"
      this.isFunction="Get";      
    }
 
}