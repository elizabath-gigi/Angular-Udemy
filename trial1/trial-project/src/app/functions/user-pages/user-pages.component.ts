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

  constructor(private functionsService: FunctionsService) {}

  ngOnInit(): void {
    this.functionsService.getBooks().subscribe(data => {
    this.totalCount = data.length;
    console.log(this.totalCount)
    this.loadBooks(this.currentPage, this.pageSize);
    
       // Calculate total pages
    });
  }

  loadBooks(pageIndex: number, pageSize: number): void {
    this.functionsService.getBooksInPages(pageIndex, pageSize).subscribe(data => {
      this.paginatedBooks = data;
      console.log(data)
      this.totalPages = Math.ceil(this.totalCount / pageSize); // Calculate total pages
    });
  }

  onPageSizeChange(): void {
    if (this.pageSize <= 0) {
      this.pageSize = 1; // Ensure page size is positive
    }
    this.currentPage = 1; // Reset to first page
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