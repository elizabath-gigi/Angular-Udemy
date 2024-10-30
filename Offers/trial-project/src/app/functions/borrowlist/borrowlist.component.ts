import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FunctionsService } from '../functions.service';
import { ToastrService } from 'ngx-toastr';
import { APP_CONSTANTS } from '../../shared/constants';

@Component({
  selector: 'app-borrowlist',
  standalone: false,
  templateUrl: './borrowlist.component.html',
  styleUrl: './borrowlist.component.css'
})
export class BorrowlistComponent implements OnInit{
  
  @Input({required:true}) getJsonValue!:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['borrowId','userName','bookName', 'borrowDate', 'returnDate', 'isReturned'];
   dataSource!: MatTableDataSource<any>;
   pageSize:number=10;
   color:any="#F6E3BA"
   constructor(private functionsService: FunctionsService,private toastr:ToastrService){}
   ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.getJsonValue);
    console.log(this.dataSource);      
   }
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
   ReturnBook(BookName: string) {
    this.functionsService.ReturnBook(BookName).subscribe({
      next: (data) => {
        this.getJsonValue = data;
        this.toastr.success(APP_CONSTANTS.book_return_success)
        console.log(this.getJsonValue);
      },
      error: (error) => {
        console.error($localize`Error from server: `, error);
        // Extract the custom error message from the backend
        const errorMessage = error.error;
        this.toastr.error(errorMessage)
        //this.message=errorMessage;
        //alert(errorMessage);
        console.log(errorMessage);
      }
    });   
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
