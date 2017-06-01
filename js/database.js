// Initialize the database
var Datastore = require('nedb');
var date = require('date-and-time');
db = new Datastore({ filename: 'db/taskdetails.db', autoload: true });

// Adds a taskdetails
exports.addTask = function(projectName, taskName,startTime,timeEnd,taskDuration) {
var now = new Date(startTime);
var now1 = new Date(timeEnd);
  // Create the taskdetails object
  var taskdetails = {
    "projectName": projectName,
    "taskName": taskName ,
	"startTime":date.format(now, 'YYYY/MM/DD HH:mm:ss'),	
	"timeEnd":date.format(now1, 'YYYY/MM/DD HH:mm:ss')};
	

  // Save the person to the database
  db.insert(taskdetails, function(err, newDoc) {
    // Do nothing
  });
};

// Returns all persons
exports.getTaskDetials = function(fnc) {

  // Get all persons from the database
  db.find({}, function(err, docs) {

    // Execute the parameter function
    fnc(docs);
  });
}

// Deletes a person
exports.deleteTask = function(id) {

  db.remove({ _id: id }, {}, function(err, numRemoved) {
    // Do nothing
  });
}
