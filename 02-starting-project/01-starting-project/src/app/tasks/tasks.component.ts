import { Component , Input} from '@angular/core';
import { type NewTaskData } from "./task/task.model";
import {TasksService} from './tasks.service'
//import {TaskComponent} from "./task/task.component";
@Component({
    selector: 'app-tasks',
    standalone: false,
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.css',
    
})
export class TasksComponent {
  @Input({required:true}) userId!:string;
  @Input({required:true}) name!:string;
  isAddingTask=false;
  /*private tasksService:TasksService;
  constructor(tasksService:TasksService)
  {
    this.tasksService=tasksService;
  }*/
  constructor(private tasksService:TasksService){}

  get selectedUserTasks()
  {
    return this.tasksService.getuserTasks(this.userId)
  }
  onStartAddTask(){
    this.isAddingTask=true;

  }
  onCloseAddTask()
  {
    this.isAddingTask=false;
  }
}
