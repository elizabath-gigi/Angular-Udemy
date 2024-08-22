import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-user-table',
  standalone: false,
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit{
  @Input({required:true}) getJsonValue!:any;
   displayedColumns: string[] = ['bookId', 'bookName', 'bookAuthor', 'noOfBook', 'price'];
   dataSource!: MatTableDataSource<any>;

   ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.getJsonValue);
   }
}
