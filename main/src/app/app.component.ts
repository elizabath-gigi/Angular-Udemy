import { Component ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'main';
  public getJsonValue:any;
  public postJsonValue:any;
  constructor(private http:HttpClient){


  }
  ngOnInit():void{
    this.getBooksMethod();

  }
  public getBooksMethod()
  {
    this.http.get('https://localhost:7220/api/Library/getBooks').subscribe((data)=>{
      this.getJsonValue=data;
    });
  }
}
