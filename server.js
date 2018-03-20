const express = require( "express");
const path = require( "path");
const app = express();
app.use(express.static( __dirname + '/my-app/dist' ));


const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RestfulTaskAPI');
mongoose.Promise = global.Promise;

var TaskSchema = new mongoose.Schema({
  title: {type: String, required: true, minlength:2, maxlength:255},
  description: {type: String, required: false, maxlength:255, default: ""},
  completed: {type: Boolean, required: false, default: false},
}, {timestamps: true})

mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');

app.listen(8000, function() {
 console.log("listening on port 8000");
})

//===========================================================

// app.get('/', function(req,res){
//   res.redirect('/tasks');
// })

app.get('/tasks', function(req, res) { // will serve up the full collection
  Task.find({}, function(err, all_tasks) {
    if(err) {
      console.log('something went wrong : 31');
      res.json({errors: err.errors});
    } else {
      console.log('index visited! sending all...');
      res.json({all_tasks});
    }
  }) // end .find all
})

app.post('/tasks', function(req, res) { // will add into the database
  if (!req.body.description){ req.body.description = "" }
  let task = new Task({title: req.body.title, description: req.body.description });
  task.save(function(err, new_task) {
    if(err) {
      console.log('something went wrong : 45');
      res.json({errors: err.errors});
    } else {
      console.log('successfully added one!');
      res.json({message: "Success", task: new_task});
    }
  }) // end .save
})

app.get('/tasks/:id', function(req, res) { //Displays information about one
  console.log("tried by name --- ", req.params.id);
  Task.findOne({_id: req.params.id}, function(err, this_task) {
    if(err) {
      console.log('something went wrong : 58');
      res.json({errors: err.errors});
    } else {
      console.log('sending one by name --- ', this_task );
      res.json({this_task});
    }
  })// end .findOne
})

app.put('/tasks/:id', function(req, res) { // will update the database.
  console.log("update sent --- ", req.params.id);
  let updates = {};
  if (req.body.title != null){
    updates.title = req.body.title;
    // console.log("title good!");
  } 
  if(req.body.description != null){
    updates.description = req.body.description;
    // console.log("desc good!");
  }
  console.log(updates);
  Task.update( {_id: req.params.id} , updates, function(err, data) {
    // console.log(data);
    if(err) {
      console.log('something went wrong : 71');
      res.json({errors: err.errors});
    } else {
      console.log('successfully updated --- ', req.params.id);
      res.json({message: "Success", data: data});
    }
  }) //end .update
})

app.delete('/tasks/:id', function(req, res) { // will delete from the database.
  console.log("delete order sent --- ", req.params.id);
  Task.remove( {_id: req.params.id}, function(err, data) {
    if(err) {
      console.log('something went wrong : 88');
      res.json({errors: err.errors});
    } else {
      console.log('successfully deleted --- ', req.params.id);
      res.json({message: "Success", data: data});
    }
  }) //end .remove
})
