import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-borrowlist',
  standalone: false,
  templateUrl: './borrowlist.component.html',
  styleUrl: './borrowlist.component.css'
})
export class BorrowlistComponent {
  @Input({required:true}) getJsonValue!:any;
  displayedColumns: string[] = ['borrowId','userName','bookName', 'borrowDate', 'returnDate', 'isReturned'];
   dataSource!: MatTableDataSource<any>;

   ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.getJsonValue);
   }
}
