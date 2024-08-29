import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Output() close =new EventEmitter<void>()
  cartItems: any[] = [];
  cartValue: number = 0;
  message: string = '';
  cartLength! : number;

  constructor(
    private functionsService: FunctionsService) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.isVisible = params['IsVisible'] === 'true'; // Check if the cart pop-up should be visible
    // });
    console.log("Cart");
    this.ViewCartItems();
    this.GetCartValue();
  }

  ViewCartItems() {
    this.functionsService.ViewCartItems().subscribe({
      next: (cartItems) => {            
        this.cartItems = cartItems;
        console.log('view carts',cartItems);
        //this.cartLength = this.cartItems.books
        this.message = $localize`Cart retrieved successfully`;
        console.log('Cart retrieved successfully', cartItems);
      },
      error: error => {
        console.error($localize`Error from server: `, error);
        const errorMessage = error.error;
        this.message = errorMessage;
        if (errorMessage === "Cart not found") {
          alert($localize`Cart not found`);
        } else if (errorMessage === "User not authenticated") {
          alert($localize`User not authenticated`);
        } else {
          alert($localize`An error occurred while retrieving the cart`);
        }
      }
    });
  }

  GetCartValue() {
    this.functionsService.GetCartValue().subscribe({
      next: (cartValue) => {
        this.cartValue = cartValue;
        this.message = $localize`CartValue retrieved successfully`;
        console.log('CartValue retrieved successfully', cartValue);
      },
      error: error => {
        console.error($localize`Error from server: `, error);
        const errorMessage = error.error;
        this.message = errorMessage;
        if (errorMessage === "Cart is empty") {
          alert($localize`Cart is empty`);
        } else {
          alert($localize`An error occurred while retrieving the cart`);
        }
      }
    });
  }
  BorrowBooks() {
    this.functionsService.BorrowBooks().subscribe({
      next: (cartItems) => {            
        this.cartItems = cartItems;
        this.GetCartValue();
          this.message = $localize`Book borrowed successfully`;
          alert($localize`Book borrowed successfully`);
          console.log(`Book borrowed successfully`);
         
      },
      error: error => {
          console.error($localize`Error from server: `, error);
          const errorMessage = error.error;
          this.message = errorMessage;
          if (errorMessage === "Book not found in cart") {
              alert($localize`Book not found in cart`);
          }
          else if(errorMessage === "Cart is empty") {
            alert($localize`Cart is empty`);
        }
      }
  });
    }
  closeCart() {
    this.close.emit();
  }
  RemoveFromCart(BookName: string) {
    console.log(BookName);
    this.functionsService.RemoveFromCart(BookName).subscribe({
      next: (cartItems) => {            
        this.cartItems = cartItems;
        console.log('rremove carts',cartItems);
        debugger;
        this.cartLength = this.cartItems.length;
        console.log(cartItems)
          this.message = $localize`Book removed from cart successfully`;
          alert($localize`Book removed from cart successfully`);
          console.log(`Book removed from cart successfully`);
          this.GetCartValue();
      },
      error: error => {
          console.error($localize`Error from server: `, error);
          const errorMessage = error.error;
          this.message = errorMessage;
          if (errorMessage === "Book not found in cart") {
              alert($localize`Book not found in cart`);
          }
          else if(errorMessage === "Cart is empty") {
            alert($localize`Cart is empty`);
        }
      }
  });
  }
}
