import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HELL!';
  tasks : any;

  newTask = {
    title : "",
    description : ""
  }

  updateTask = {
    show: false,
    title : "",
    description : "",
    _id : ""
  }

  constructor(private _httpService: HttpService){}
  
  ngOnInit(){
    this.tasks = false;
    // this.getTasksFromService();
  }
  populateUpdate(taskTiltle, taskDesc, taskId){
    this.updateTask = {
      show :true,
      title : taskTiltle,
      description : taskDesc,
      _id : taskId
    }
  }
  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got our data!", data);
      this.tasks = data['all_tasks'];
    })
  }
  createTaskFromService(){
    let observable = this._httpService.createOneTask(this.newTask);
      observable.subscribe(data => {
        console.log("Got our data!", data);
        this.getTasksFromService(); //refresh task list
        this.newTask = {
          title : "",
          description : ""
        }
      })
  }
  updateTaskFromService(){
    // console.log(this.updateTask);
    
    let observable = this._httpService.updateOneTask(this.updateTask);
    observable.subscribe(data => {
      console.log("Got our data!", data);
      this.getTasksFromService(); //refresh task list
      this.updateTask = {
        show: false,
        title : "",
        description : "",
        _id : ""
      }
    })
  }
  cancelEdit(){
    this.updateTask = {
      show: false,
      title : "",
      description : "",
      _id : ""
    }
  }
  deleteTaskFromService(taskId){
    let observable = this._httpService.deleteOneTask(taskId);
    observable.subscribe(data => {
      console.log("Delete one by id ran!", data);
      this.getTasksFromService(); //refresh task list
    })
    
    }
  }


