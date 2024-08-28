import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FunctionsService } from '../functions.service';

@Component({
  selector: 'app-borrow',
  standalone: false,
  templateUrl: './borrow.component.html',
  styleUrl: './borrow.component.css'
})
export class BorrowComponent implements OnInit{
  @Output() close =new EventEmitter<void>()
  getJsonValue: any;
  message: any;
  constructor(private functionsService: FunctionsService) {}

  ngOnInit(): void {
    console.log("Cart");
    this.getUserBorrows();
  }
  getUserBorrows() {
    this.functionsService.getUserBorrows().subscribe({
      next: (data) => {
        this.getJsonValue = data;
        console.log(this.getJsonValue);
      },
      error: (error) => {
        console.error($localize`Error from server: `, error);
        
        // Extract the custom error message from the backend
        const errorMessage = error.error;
        this.message=errorMessage;
        //alert(errorMessage);
        console.log(errorMessage);
      }
    });   
 }
 ReturnBook(BookName: string) {
  this.functionsService.ReturnBook(BookName).subscribe({
    next: (data) => {
      this.getJsonValue = data;
      console.log(this.getJsonValue);
    },
    error: (error) => {
      console.error($localize`Error from server: `, error);
      
      // Extract the custom error message from the backend
      const errorMessage = error.error;
      this.message=errorMessage;
      //alert(errorMessage);
      console.log(errorMessage);
    }
  });   
  }
 closeBorrow() {
  this.close.emit();
}
}
