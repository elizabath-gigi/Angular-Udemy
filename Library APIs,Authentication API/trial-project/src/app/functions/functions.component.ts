import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FunctionsService } from './functions.service'; 

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrl: './functions.component.css'
})
  
export class FunctionsComponent {
  message!: string;
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
      try{
        this.functionsService.getBooks().subscribe(data=>{
          this.isFunction="GetBooks"
          this.getJsonValue =data;
        })
     }
     catch(error)
     {
      console.error('Error from server: ',error);
      this.message='Get Books failed.';
     }

      
    }
    
    
    
    getBooksInPages() {
      // this.functionsService.getBooksInPages().subscribe(data=>{
       this.isFunction="GetInPages";
      //   //console.log('inside component',s);
      //   this.getJsonValue =data;
      // })
      
   
    }
    deleteBook() {
      this.buttonName="Delete";
      this.isFunction="Delete";      
    }
    updateBook() {
      this.buttonName="Update"
      this.isFunction="Update";   
    }
    bulkUpload() {
      this.isFunction="BulkUpload"
    
    }
    getBook() {
      this.buttonName="Get"
      this.isFunction="Get";      
    }
 
}