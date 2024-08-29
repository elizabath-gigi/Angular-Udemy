import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColDef, GridReadyEvent, CellValueChangedEvent } from 'ag-grid-community';
import { FunctionsService } from '../functions.service';
import { Book } from './Book.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';


@Component({
  selector: 'app-functions-admin',
  standalone: false,
  templateUrl: './functions-admin.component.html',
  styleUrls: ['./functions-admin.component.css']
})
export class FunctionsAdminComponent implements OnInit {
  bookForm: FormGroup;
  books: Book[] = [];
  message: string = '';
  columnDefs: ColDef[] = [
    { field: 'bookId', headerName: 'ID', editable: false },
    { field: 'bookName', headerName: 'Book Name', editable: true },
    { field: 'noOfBook', headerName: 'Number of Books', editable: true },
    { field: 'price', headerName: 'Price', editable: true },
    {
      field: 'bookImage',
      headerName: 'Image',
      cellRenderer: (params: { value: any; }) => {
        return params.value ? `<img src="${params.value}" style="width:50px;height:50px;" />` : '';
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: 'actionCellRenderer'
    }
  ];
  defaultColDef = { sortable: true, filter: true, resizable: true };
  paginationPageSize = 10;
  currentPage = 1;

  constructor(private fb: FormBuilder, private functionsService: FunctionsService) {
    this.bookForm = this.fb.group({
      bookName: [''],
      noOfBook: [1],
      Price: [0],
      BookImage: [null]
    });
  }

  ngOnInit() {
    this.loadBooks(this.currentPage, this.paginationPageSize);
  }

  loadBooks(page: number, pageSize: number) {
    this.functionsService.getBooksInPages(page, pageSize).subscribe((data: Book[]) => {
      this.books = data;
    });
  }

  addBook() {
    if (this.bookForm.valid) {
      const formData = this.createFormData();
      this.functionsService.addBook(formData).subscribe({
        next: () => {
          this.message = $localize`Added Successfully`;
          this.loadBooks(this.currentPage, this.paginationPageSize);
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

  updateBook(data: any) {
    if (this.bookForm.valid) {
      const formData = this.createFormData();
      this.functionsService.updateBook(formData).subscribe({
        next: () => {
          this.message = $localize`Updated Successfully`;
          this.loadBooks(this.currentPage, this.paginationPageSize); // Reload books after update
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

  deleteBook(bookId: number) {
    this.functionsService.deleteBook(bookId).subscribe(() => {
      this.message = $localize`Deleted Successfully`;
      this.loadBooks(this.currentPage, this.paginationPageSize); // Reload books after deletion
    });
  }

  private createFormData(): FormData {
    const formData = new FormData();
    formData.append('bookName', this.bookForm.get('bookName')?.value);
    formData.append('noOfBook', this.bookForm.get('noOfBook')?.value);
    formData.append('price', this.bookForm.get('Price')?.value);
    
    const bookImage = this.bookForm.get('BookImage')?.value;
    if (bookImage) {
      formData.append('bookImage', bookImage);
    }
    
    return formData;
  }

  private resetForm(): void {
    this.bookForm.reset({
      bookName: '',
      noOfBook: 1,
      Price: 0,
      BookImage: null
    });
  }

  handleError(error: any) {
    console.error('An error occurred:', error);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.bookForm.patchValue({
        BookImage: file
      });
    }
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }
}
