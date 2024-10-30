import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-books',
  standalone: false,
  templateUrl: './get-books.component.html',
  styleUrl: './get-books.component.css'
})
export class GetBooksComponent {
  noOfBooksInCart!: number;
  constructor(private functionsService:FunctionsService,private toastr: ToastrService){}
  @Input({required:true}) getJsonValue!:any;
  @Output() messageEvent = new EventEmitter<number>();
  BookName!: number;
  message!: string;
  today: Date = new Date();  

 
  // isOnSale(book: any): boolean {
  //   console.log(book);
  //   const saleStartDate = new Date(book.startDate);  
  //   const saleEndDate = new Date(book.endDate);
  //   return this.today >= saleStartDate && this.today <= saleEndDate;
  // }
  // getPriceDisplay(book: any): { isOnSale: boolean, price: string, offerPrice?: string } {
  //   if (this.isOnSale(book)) {
  //     return {
  //       isOnSale: true,
  //       price: `$${book.price}`,
  //       offerPrice: `$${book.offerPrice}`
  //     };
  //   } else {
  //     return {
  //       isOnSale: false,
  //       price: `$${book.price}`
  //     };
  //   }
  // }
  
  
  
  AddToCart(BookName: string,Price:number){
    console.log(BookName,Price);
    this.functionsService.AddToCart(BookName,Price).subscribe({
      next: () => {
        this.functionsService.ViewCartItems().subscribe({
          next:(data)=>{
            this.noOfBooksInCart=data.length;
            this.messageEvent.emit(this.noOfBooksInCart);
          }
        })
          this.message = $localize`Book added to cart successfully`;
          this.toastr.success($localize`Book added to cart successfully`);
          //alert($localize`Book added to cart successfully`);
          console.log($localize`Book added to cart successfully`)
      },
      error: error => {
          console.error($localize`Error from server: `, error);
          const errorMessage = error.error;
          this.message = errorMessage;
          if (errorMessage === "No books availabe") {
              this.toastr.error($localize`No books availabe`);
          } 
          else if (errorMessage === "Book already found in cart") {
               this.toastr.error($localize`Book already found in cart`);
          }
          else if (errorMessage === "Book already found borrowed and not yet returned") {
            this.toastr.error($localize`Book already found borrowed and not yet returned`);
        }
      }
  });  
  } 
}
