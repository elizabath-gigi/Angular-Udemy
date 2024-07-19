import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'trial-project';
  public getJsonValue:any;
  public postJsonValue:any;
  constructor(private http:HttpClient){


  }
  ngOnInit():void{
    this.getBooksMethod();
    this.addBookMethod();
  }
  public getBooksMethod()
  {
    this.http.get('https://localhost:7220/api/Library/getBooks').subscribe((data)=>{
      this.getJsonValue=data;
    });
  }
  public addBookMethod()
  {
    const header=new HttpHeaders({
      contentsType:"application/json"
    })
    let body={
      bookName: "xyz",
      bookAuthor: "abc",
      noOfBook: 8,
      price: 250

    }
    this.http.post('https://localhost:7220/api/Library/addBook',body,{headers:header}).subscribe((data)=>{
      this.postJsonValue=data;
    });
  }

 

}
