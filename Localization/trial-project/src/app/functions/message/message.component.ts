import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: false,
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Input({required:true}) message!:string;
  displayMessage: string | null = null;

  ngOnInit(): void {
    if (this.message) {
      this.displayMessage = this.message;
      setTimeout(() => {
        this.displayMessage = null;
      }, 2000);
    }
  }
}
