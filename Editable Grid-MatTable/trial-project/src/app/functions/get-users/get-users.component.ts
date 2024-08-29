import { Component, Input, OnInit } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-get-users',
  standalone: false,
  templateUrl: './get-users.component.html',
  styleUrl: './get-users.component.css'
})
export class GetUsersComponent implements OnInit{
  @Input({required:true}) getJsonValue!:any;
   displayedColumns: string[] = ['userId', 'userName', 'email', 'role'];
   dataSource!: MatTableDataSource<any>;

   ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.getJsonValue);
   }
}
