import { HttpClient, HttpEvent, HttpHeaders } from "@angular/common/http"
import {Injectable} from "@angular/core"
import { type Book } from "./user-input/user-input.model";
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class FunctionsService
{
    postJsonValue!:any;
    message!: string;
    getJsonValue!:any;
    constructor(private http:HttpClient){

    }
    getBooks(): Observable<any>
    {
      //   this.http.get('https://localhost:7220/api/Library/getBooks').subscribe((data) => {
      //   this.getJsonValue = data;
      //   console.log('inside service',this.getJsonValue);
      //   return (this.getJsonValue);
      // });
       return this.http.get('https://localhost:7220/api/Library/getBooks')   
    }
    addBook(book:Book)
    {
      //this.buttonName="Add";
      const header=new HttpHeaders({
      contentsType:"application/json"
       })
      return this.http.post('https://localhost:7220/api/Library/addBook',book,{headers:header})
    }
    updateBook(book:Book)
    {
        const header=new HttpHeaders({
            contentsType:"application/json"
          })
          return this.http.put('https://localhost:7220/api/DynamicLibrary/updateBook',book,{headers:header})
            
          
          
    }
     getBook(bookId:number):Observable<any>
    {
        // const header=new HttpHeaders({
        //     contentsType:"application/json"
        //   })
        //   await this.http.get(`https://localhost:7220/api/Library/getBook?id=${bookId}`,{headers:header}).subscribe((data)=>{
        //     this.postJsonValue=data;
        //     console.log(this.postJsonValue);
        //     return  this.postJsonValue;
        //   });
        const header=new HttpHeaders({
              contentsType:"application/json"
            })
        return this.http.get(`https://localhost:7220/api/Library/getBook?id=${bookId}`,{headers:header})
         
    }
    deleteBook(bookId:number)
    {
        const header=new HttpHeaders({
            contentsType:"application/json"
          })
          return this.http.delete(`https://localhost:7220/api/Library/deleteBook?id=${bookId}`,{headers:header})    
    }


     

    getBooksInPages(pageIndex: number, pageSize: number):Observable<any>
    {
      return this.http.get(`https://localhost:7220/api/Library/getBooksInPages?page=${pageIndex}&pageSize=${pageSize}`);
    }


    bulkUpload(formData: FormData): Observable<any> {
      return this.http.post('https://localhost:7220/api/DynamicLibrary/bulkUploadDynamic', formData, {
        reportProgress: true,
        observe: 'events',
        headers: new HttpHeaders({
          'Accept': 'text/plain' // Change this to the appropriate type if needed
        }),
        responseType: 'text' as 'json'
      });
    }

}