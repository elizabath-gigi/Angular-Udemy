import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../functions.service';

@Component({
  selector: 'app-user-pages',
  templateUrl: './user-pages.component.html',
  styleUrls: ['./user-pages.component.css']
})
export class UserPagesComponent implements OnInit {
  paginatedBooks: any[] = [];
  currentPage: number = 1;
  totalPages!: number;
  totalCount!:number;
  pageSize: number = 10; // Default page size
  HeaderColumn: any;
  message!: string;

  constructor(private functionsService: FunctionsService) {}

  ngOnInit(): void {
    this.functionsService.getBooksAdmin().subscribe(data => {
    this.totalCount = data.length;
    this.HeaderColumn=['bookId', 'bookName', 'bookAuthor', 'noOfBook', 'price'];
    this.loadBooks(this.currentPage, this.pageSize);
    });
  }

  loadBooks(pageIndex: number, pageSize: number): void {
    this.functionsService.getBooksInPages(pageIndex, pageSize).subscribe({
      next: (data) => {
        this.paginatedBooks = data;
        this.totalPages = Math.ceil(this.totalCount / pageSize);
      },
      error: (error) => {
        console.error($localize`Error from server: `, error);
        const errorMessage = error.error ;
        this.message = errorMessage;
        alert(errorMessage);
        console.log(errorMessage);
      }
    });
  }

  onPageSizeChange(): void {
    if (this.pageSize <= 0) {
      this.pageSize = 1; 
    }
    this.currentPage = 1; 
    this.loadBooks(this.currentPage, this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadBooks(this.currentPage, this.pageSize);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadBooks(this.currentPage, this.pageSize);
    }
  }
}