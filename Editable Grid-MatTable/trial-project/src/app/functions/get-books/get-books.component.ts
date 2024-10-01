import { Component, Input } from '@angular/core';
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
  constructor(private functionsService:FunctionsService,private toastr: ToastrService){}
  @Input({required:true}) getJsonValue!:any;
  BookName!: number;
  message!: string;
  
  AddToCart(BookName: string){
    console.log(BookName);
    this.functionsService.AddToCart(BookName).subscribe({
      next: () => {
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
