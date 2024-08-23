import { HttpClient, HttpEvent, HttpHeaders } from "@angular/common/http"
import {Injectable} from "@angular/core"
import { Observable } from 'rxjs';
import { User } from "./user.model";
import { LoginDto } from "./loginDto";
import { ResetDto } from "./resetDto";

@Injectable({
    providedIn: 'root'
  })
  export class AuthenticationService{
    constructor(private http:HttpClient){

    }
    getNameInHindi(username:string):Observable<any>
    {
        const header=new HttpHeaders({
            contentsType:"application/json"
             })
             return this.http.get(`https://localhost:7261/User/getNameHindi?UserName=${username}`,{ responseType: 'text' as 'json' }) 
    }
    register(user:User):Observable<any>
    {
        const header=new HttpHeaders({
            contentsType:"application/json"
             })
            return this.http.post('https://localhost:7261/User/register',user)    
    }
    login(loginDto:LoginDto):Observable<string>
    {
        const header=new HttpHeaders({
            contentsType:"application/json"
             })
            return this.http.post('https://localhost:7261/User/login',loginDto,{responseType:'text'})       
    }
    reset(resetDto:ResetDto):Observable<string>
    {
        const header=new HttpHeaders({
            contentsType:"application/json"
             })
            return this.http.put('https://localhost:7261/User/reset-password',resetDto,{responseType:'text'})       
    }
    
    
  }