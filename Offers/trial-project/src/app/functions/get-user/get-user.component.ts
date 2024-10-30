import { Component, Input } from '@angular/core';
import { FunctionsService } from '../functions.service';

@Component({
  selector: 'app-get-user',
  standalone: false,
  templateUrl: './get-user.component.html',
  styleUrl: './get-user.component.css'
})
export class GetUserComponent {
  entries: [string, any][] = [];
  Username: string="";
  constructor(private functionsService:FunctionsService){}
  @Input({required:true}) buttonName!:string;
  @Input({required:true}) isFunction!:string;
  UserId:number=0;
  message: any;
  postJsonValue: any;
  userInput()
  {
    if(this.isFunction=="GetUserById")
      {
        this.getUserById();
      }
      else if(this.isFunction=="DeleteUser")
      {        
        this.deleteUser();
      }
      else if(this.isFunction=="GetUserByUsername")
      {
        this.getUserByUsername();
      }
  
  }
  getUserByUsername() {
    this.functionsService.getUserByUsername(this.Username).subscribe({
      next: data => {
        this.postJsonValue = data;
        this.Username = "";
        this.entries = Object.entries(this.postJsonValue);
        this.message = $localize`User Retrieved Successfully`;
      },
      error: error => {
        console.error($localize`Error from server: `, error);
        // Extract the custom error message from the backend
        const errorMessage = error.error;
        this.message=errorMessage;
        if(errorMessage=="The user doesn't exist")
        {
          alert($localize`The user doesn't exist`);
        }
      }
    });
    
  }
  deleteUser() {
    this.functionsService.deleteUser(this.Username).subscribe({
      next: () => {
        this.Username = "";
        this.message =$localize`User Deleted Successfully`;
      },
      error: error => {
        console.error($localize`Error from server: `, error);
        // Extract the custom error message from the backend
        const errorMessage = error.error;
        this.message=errorMessage;
        if(errorMessage=="The user doesn't exist or is already deleted.")
        {
          alert($localize`The user doesn't exist or is already deleted.`);
        }
        else if(errorMessage=="The user found is an Admin, delete failed.")
          {
            alert($localize`The user found is an Admin, delete failed.`);
          }
      }
    });
    
  }
  getUserById() {
    this.functionsService.getUserById(this.UserId).subscribe({
      next: data => {
        this.postJsonValue = data;
        this.UserId = 0;
        this.entries = Object.entries(this.postJsonValue);
        this.message = $localize`User Retrieved Successfully`;
      },
      error: error => {
        console.error($localize`Error from server: `, error);
        // Extract the custom error message from the backend
        const errorMessage = error.error;
        this.message=errorMessage;
        if(errorMessage=="The user doesn't exist")
        {
          alert($localize`The user doesn't exist`);
        }
      }
    });
    
  }

}
