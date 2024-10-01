import { APP_CONSTANTS } from './../../shared/constants';
import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FunctionsService } from '../functions.service'; // Adjust the import as necessary
import { Book } from './user-input.model'; // Adjust the import as necessary

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {
  
  @Output() close =new EventEmitter<void>()
  @Input({ required: true }) buttonName!: string;
  @Input({ required: true }) page!: string;
  message!: string;
  
  // Updated Book model with optional bookImage property
  book: Book = {
    bookId: 0,
    bookName: '',
    bookAuthor: '',
    noOfBook: '',
    price: '',
    bookImage: null,
    description:''
  };
  
  postJsonValue: any;

  constructor(private functionsService: FunctionsService,private toastr:ToastrService) {}

  userInput() {
    if (this.page === 'Add') {
      this.addBook();
    } else if (this.page === 'Update') {
      this.updateBook();
    }
  }

  addBook() {
    if (this.book.bookName == '' ||
      this.book.bookAuthor == '' ||
      this.book.noOfBook == '' ||
      this.book.price == ''||
      this.book.description=='') {
      this.toastr.warning(APP_CONSTANTS.required)
      console.log(APP_CONSTANTS.required)
      
    } else {
      const formData = this.createFormData();
      console.log("000000")
      this.functionsService.addBook(formData).subscribe({
        next: () => {
         // this.message = $localize`Added Successfully`;
          this.toastr.success(APP_CONSTANTS.book_add_success)
          this.closeDialog()
          this.resetForm();
        },
        error: error => {
          const errorMessage = error.error;
          this.message = errorMessage;
          this.toastr.error(errorMessage);
        }
      });
    }
  }
  closeDialog() {
    this.close.emit();
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
      //alert($localize`All fields are required`);
      this.toastr.warning(APP_CONSTANTS.required)
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
    formData.append('description',this.book.description)
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
      bookImage: null,
      description:''
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
    this.toastr.error(errorMessage);
  }
}
