import { Component,Input,Output,EventEmitter } from '@angular/core';
//import { DUMMY_USERS } from '../dummy-users';
//const randomIndex=Math.floor(Math.random()*DUMMY_USERS.length)
import { type User} from './user.model'
import { CardComponent } from "../shared/card/card.component";

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    imports: [CardComponent]
})
export class UserComponent {
  //@Input({required:true}) id!: string;
  //@Input({required:true}) avatar!:string;
  //@Input({required:true}) name!:string;
  @Input({required:true}) user!:User;
  @Input({required:true}) selected!:boolean;
  @Output() select = new EventEmitter<string>();
  //Signal
  //selectedUser=signal(DUMMY_USERS[randomIndex])
  //imagePath=computed(()=>'assets/users/'+this.selectedUser().avatar)
  //Zone
  get imagePath()
  {
    return 'assets/users/'+this.user.avatar
  }
  onSelectUser()
  {
    this.select.emit(this.user.id);






     
    //Signal
    //const randomIndex=Math.floor(Math.random()*DUMMY_USERS.length)
    //this.selectedUser.set(DUMMY_USERS[randomIndex])
    //Zone
    //this.selectedUser=DUMMY_USERS[randomIndex]
  }
}
