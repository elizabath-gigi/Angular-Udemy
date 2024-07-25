import { Component, OnInit, ViewChild } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { MatTableDataSource } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-user-pages',
  standalone: false,
  templateUrl: './user-pages.component.html',
  styleUrl: './user-pages.component.css'
})
export class UserPagesComponent implements OnInit {
  getJsonValue: any[] = [];
  paginatedBooks: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;

  constructor(private functionsService: FunctionsService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.functionsService.getBooks().subscribe(data => {
      this.getJsonValue = data;
      this.totalPages = Math.ceil(this.getJsonValue.length / this.pageSize);
      this.paginateBooks();
    });
  }

  paginateBooks(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedBooks = this.getJsonValue.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateBooks();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateBooks();
    }
  }
}
