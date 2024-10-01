import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { APP_CONSTANTS } from '../../shared/constants';

@Component({
  selector: 'app-get-users',
  standalone: false,
  templateUrl: './get-users.component.html',
  styleUrl: './get-users.component.css'
})
export class GetUsersComponent implements OnInit{
  @Input({required:true}) getJsonValue!:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private functionsService:FunctionsService,private toastr:ToastrService){}
   displayedColumns: string[] = ['userId', 'userName', 'email', 'role'];
   dataSource!: MatTableDataSource<any>;
   color:any="#F6E3BA"
   ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.getJsonValue);
   }
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  deleteUser(Username:string) {
    this.functionsService.deleteUser(Username).subscribe({
      next: () => {
        this.toastr.success(APP_CONSTANTS.user_delete_success)
        //this.message =$localize`User Deleted Successfully`;
      },
      error: error => {
        console.error($localize`Error from server: `, error);
        // Extract the custom error message from the backend
        const errorMessage = error.error;
        //this.message=errorMessage;
        this.toastr.error(errorMessage);
      }
    });
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
