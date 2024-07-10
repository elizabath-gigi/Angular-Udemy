import { Component ,Output,EventEmitter,inject,Input} from '@angular/core';
import {type NewTaskData}  from '../task/task.model'
import {TasksService} from '../tasks.service';
@Component({
  selector: 'app-new-task',
  standalone: false,
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Input({required:true}) userId!:string;
  @Output() close =new EventEmitter<void>()
  
  enteredTitle='';
  enteredSummary='';
  enteredDate='';
  private tasksServiice=inject(TasksService)
  onCancel(){
    this.close.emit();
  }
  onSubmit()
  {
    this.tasksServiice.addTask({
      title:this.enteredTitle,
      summary:this.enteredSummary,
      date:this.enteredDate,
    },
    this.userId
  );
  this.close.emit();
  }

}
