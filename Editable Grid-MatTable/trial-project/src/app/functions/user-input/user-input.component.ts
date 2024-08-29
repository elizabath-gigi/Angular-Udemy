import { Component, Input } from '@angular/core';
import { FunctionsService } from '../functions.service'; // Adjust the import as necessary
import { Book } from './user-input.model'; // Adjust the import as necessary

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {
  @Input({ required: true }) buttonName!: string;
  @Input({ required: true }) isFunction!: string;
  message!: string;
  
  // Updated Book model with optional bookImage property
  book: Book = {
    bookId: 0,
    bookName: '',
    bookAuthor: '',
    noOfBook: '',
    price: '',
    bookImage: null // Initialize bookImage as null
  };
  
  postJsonValue: any;

  constructor(private functionsService: FunctionsService) {}

  userInput() {
    if (this.isFunction === 'Add') {
      this.addBook();
    } else if (this.isFunction === 'Update') {
      this.updateBook();
    }
  }

  addBook() {
    if (this.isFormValid()) {
      const formData = this.createFormData();
      this.functionsService.addBook(formData).subscribe({
        next: () => {
          this.message = $localize`Added Successfully`;
          this.resetForm();
        },
        error: error => {
          console.error($localize`Error from server: `, error);
          this.handleError(error);
        }
      });
    } else {
      alert($localize`All fields are required`);
    }
  }

  updateBook() {
    if (this.isFormValid(true)) {
      const formData = this.createFormData();
      this.functionsService.updateBook(formData).subscribe({
        next: () => {
          this.message = $localize`Updated Successfully`;
          this.resetForm();
        },
        error: error => {
          console.error($localize`Error from server: `, error);
          this.handleError(error);
        }
      });
    } else {
      alert($localize`All fields are required`);
    }
  }


  private isFormValid(checkId: boolean = false): boolean {
    return this.book.bookName !== '' &&
           this.book.bookAuthor !== '' &&
           this.book.noOfBook !== '' &&
           this.book.price !== '' &&
           (!checkId || this.book.bookId !== 0);
  }

  
  private createFormData(): FormData {
    const formData = new FormData();
    formData.append('bookId', this.book.bookId.toString());
    formData.append('bookName', this.book.bookName);
    formData.append('bookAuthor', this.book.bookAuthor);
    formData.append('noOfBook', this.book.noOfBook);
    formData.append('price', this.book.price);
    if (this.book.bookImage) {
      formData.append('bookImage', this.book.bookImage);
    }
    return formData;
  }

  
  private resetForm(): void {
    this.book = {
      bookId: 0,
      bookName: '',
      bookAuthor: '',
      noOfBook: '',
      price: '',
      bookImage: null
    };
  }
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.book.bookImage = file;
    }
  }
  // Handle error responses
  private handleError(error: any): void {
    const errorMessage = error.error;
    this.message = errorMessage;
    if (errorMessage === "The book doesn't exist.") {
      alert($localize`The book doesn't exist.`);
    } else {
      alert(errorMessage);
    }
  }
}
