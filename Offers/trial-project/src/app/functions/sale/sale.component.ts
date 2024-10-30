import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FunctionsService } from '../functions.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { APP_CONSTANTS } from '../../shared/constants';
import { Sale } from './sale.model';

@Component({
  selector: 'app-sale',
  standalone: false,
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent implements OnInit{
  @Input({required:true}) getJsonValue!:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private functionsService:FunctionsService,private toastr:ToastrService){}
   displayedColumns: string[] = ['saleId', 'saleName','saleDescription', 'startDate', 'endDate'];
   displayedColumn: string[] = ['sale Id', 'sale Name','sale Description', 'start Date', 'end Date'];
   dataSource!: MatTableDataSource<any>;
   color:any="#F6E3BA"
   pageSize = 10;
   currentPage = 0; 
   ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.getJsonValue);
   }
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteBook(bookId:number){
    this.functionsService.deleteBook(bookId).subscribe({
      next: () => {
        this.toastr.success(APP_CONSTANTS.book_delete_success)
        //this.message =$localize`Book Deleted Successfully`;
      },
      error: error => {
        console.error($localize`Error from server: `, error);
        const errorMessage = error.error;
        this.toastr.error(errorMessage);
      }
    });
  }
  saveChanges(sale: Sale): void {
  
  
}

}
