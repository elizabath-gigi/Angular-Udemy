import { Component } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private functionsService:FunctionsService,private toastr:ToastrService,private router: Router){} 
// goToGetBooks() {
//   this.router.navigate(['/books']);
// }
 
  
  
}
