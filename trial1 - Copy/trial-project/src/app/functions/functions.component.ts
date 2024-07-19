import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrl: './functions.component.css'
})
  
export class FunctionsComponent {
  public isAddingBook=false;
  public getJsonValue:any;
  public postJsonValue:any;
  public onAddBook()
    {
      this.isAddingBook=true;
    }
    public getBooks()
    {
    // this.http.get('https://localhost:7220/api/Library/getBooks').subscribe((data)=>{
    //   this.getJsonValue=data;
    // });
    }
    
  addBookDynamic() {
    throw new Error('Method not implemented.');
    }
    deleteBook() {
    throw new Error('Method not implemented.');
    }
    updateBook() {
    throw new Error('Method not implemented.');
    }
    addBookFromFile() {
    throw new Error('Method not implemented.');
    }
    getBook() {
    throw new Error('Method not implemented.');
    }


  
}