import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
    // this.getTasks();
    // this.getOneTask();
    // this.createOneTask();
    // this.updateOneTask();
    // this.deleteOneTask();
   }

   getTasks(){
     return this._http.get('/tasks');
     // let tempOb = this._http.get('/tasks');
     // tempOb.subscribe(data => console.log("Got our tasks!", data));
   }

   getOneTask(id=0){
     // let dummy = "5aa9830fba632969097670f5"
     return this._http.get('/tasks/' + id);
     // let oneTask = this._http.get('/tasks/' + id);
     // oneTask.subscribe(data => console.log("Got one back by id! ", data));
   }

   createOneTask(newTask){
     return this._http.post('/tasks',  {"title": newTask.title, "description": newTask.description});
     // let oneTask = this._http.post('/tasks',  {"title": title, "description": description});
     // oneTask.subscribe(data => console.log("Created one! ", data));
   }

   updateOneTask(thisTask){
    //  console.log(thisTask);
     
     return this._http.put('/tasks/' + thisTask._id, {"title": thisTask.title, "description": thisTask.description});
     // let oneTask = this._http.put('/tasks/' + id, {"title": title, "description": description});
     // oneTask.subscribe(data => console.log("Updated one! ", data));
   }

   deleteOneTask(id=0){
     return this._http.delete('/tasks/' + id);
     // let oneTask = this._http.delete('/tasks/' + id);
     // oneTask.subscribe(data => console.log("Deleted by id! ", data));
   }
}
