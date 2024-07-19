import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrl: './functions.component.css'
})
  
export class FunctionsComponent {
  
  public isAddingBook=false;
  public buttonName="";
  // public getJsonValue:any;
  // public postJsonValue:any;
  public onAddBook()
    {
      this.buttonName="Add"
      this.isAddingBook=true;
    }
    public getBooks()
    {
    // this.http.get('https://localhost:7220/api/Library/getBooks').subscribe((data)=>{
    //   this.getJsonValue=data;
    // });
    }
    
  getBooksInPages() {
   
    }
    deleteBook() {
    
    }
    updateBook() {
      this.buttonName="Update"
      this.isAddingBook=true;   
    }
    addBookFromFile() {
    
    }
    getBook() {
    
    }


  
}