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
    getUsers(): Observable<any>
    {
      
       return this.http.get('https://localhost:7261/Admin/getUsers')   
    }
    getUserById(UserId:number): Observable<any>
    {
      const header=new HttpHeaders({
        contentsType:"application/json"
      })
       return this.http.get(`https://localhost:7261/Admin/getUserById?UserId=${UserId}`,{headers:header})   
    }
    getUserByUsername(Username:string): Observable<any>
    {
      const header=new HttpHeaders({
        contentsType:"application/json"
      })
       return this.http.get(`https://localhost:7261/Admin/getUserByUsername?UserName=${Username}`,{headers:header}) 
    }
    deleteUser(Username:string)
    {
        const header=new HttpHeaders({
            contentsType:"application/json"
          })
          return this.http.delete(`https://localhost:7261/Admin/deleteUser?UserName=${Username}`,{headers:header})    
    }
    search(searchKey:string)
    {
        const header=new HttpHeaders({
            contentsType:"application/json"
          })
          return this.http.get(`https://localhost:7254/Library/search?searchKey=${searchKey}`,{headers:header})    
    }
    getBooks(): Observable<any>
    {
       return this.http.get('https://localhost:7254/Library/getBooks')   
    }
    addBook(formData: FormData): Observable<any>
    {
      //this.buttonName="Add";
      const header=new HttpHeaders({
      contentsType:"application/json"
       })
      return this.http.post('https://localhost:7254/Library/addBook',formData,{headers:header})
    }
    updateBook(formData: FormData): Observable<any>
    {
        const header=new HttpHeaders({
            contentsType:"application/json"
          })
          return this.http.put('https://localhost:7254/Library/updateBook',formData,{headers:header})
            
          
          
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
        return this.http.get(`https://localhost:7254/Library/getBook?id=${bookId}`,{headers:header})
         
    }
    getBookByName(bookName:string):Observable<any>
    {
       
        const header=new HttpHeaders({
              contentsType:"application/json"
            })
        return this.http.get(`https://localhost:7254/Library/getByBookName?BookName=${bookName}`,{headers:header})
         
    }
    deleteBook(bookId:number)
    {
        const header=new HttpHeaders({
            contentsType:"application/json"
          })
          return this.http.delete(`https://localhost:7254/Library/deleteBook?id=${bookId}`,{headers:header})    
    }


     

    getBooksInPages(pageIndex: number, pageSize: number):Observable<any>
    {
      return this.http.get(`https://localhost:7254/Library/getBooksInPages?page=${pageIndex}&pageSize=${pageSize}`);
    }


    bulkUpload(formData: FormData): Observable<any> {
      return this.http.post('https://localhost:7254/Library/bulkUploadDynamic', formData, {
        reportProgress: true,
        observe: 'events',
        headers: new HttpHeaders({
          'Accept': 'text/plain' // Change this to the appropriate type if needed
        }),
        responseType: 'text' as 'json'
      });
    }
    getBorrowList(): Observable<any>
    {
       return this.http.get('https://localhost:7261/getAllBorrows')   
    }
    getUserBorrows(): Observable<any>
    {
       return this.http.get('https://localhost:7261/getUserBorrows')   
    }
    ViewCartItems():Observable<any>
    {
       return this.http.get(`https://localhost:7261/ViewCartItems`) 
    }
    GetCartValue():Observable<any>
    {
       return this.http.get(`https://localhost:7261/GetCartValue`) 
    }
    AddToCart(BookName:string): Observable<any>
    {
      const header=new HttpHeaders({
        contentsType:"application/json"
      })
       return this.http.post(`https://localhost:7261/AddCartItem?BookName=${BookName}`,{headers:header})   
    }
    RemoveFromCart(BookName:string): Observable<any>
    {
      const header=new HttpHeaders({
        contentsType:"application/json"
      })
      return this.http.delete(`https://localhost:7261/RemoveCartItem?BookName=${BookName}`,{headers:header})   
    }
    BorrowBooks(): Observable<any>
    {
      const header=new HttpHeaders({
        contentsType:"application/json"
      })
      return this.http.delete(`https://localhost:7261/BorrowCartItem`,{headers:header}); 
    }
    ReturnBook(BookName:string): Observable<any>
    {
      const header=new HttpHeaders({
        contentsType:"application/json"
      })
      return this.http.delete(`https://localhost:7261/ReturnBook?BookName=${BookName}`,{headers:header})   
    }
}
