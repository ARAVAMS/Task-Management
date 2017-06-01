const database = require('./js/database');
var  myApp = angular.module('task',[]);



myApp.controller('taskdetailsctrl', ['$scope','$rootScope','$window','$location', function ($scope,$rootScope,$window,$location ) {
$scope.history = [];
var eatTimerCtrl= this;
 //$scope.timeSchedule = initService.timeSchedule;
    
	 $scope.IsVisible = true;	
   	  
eatTimerCtrl.init=function(){
	 $scope.IsVisible = true;
   database.getTaskDetials(function(taskdetails) {
	    for (i = 0; i < taskdetails.length; i++) {
	 
		  $scope.history.push(' <tr><td>' + taskdetails[i].projectName +'</td><td>' + taskdetails[i].taskName + '</td><td>' +taskdetails[i].startTime +'</td><td>' +taskdetails[i].timeEnd +'</td> </tr>' );			  
	$rootScope.current = $scope.history;
	
   }

   
$window.sessionStorage.setItem("myList" ,$rootScope.current);	
   
   document.getElementById('tablebody').innerHTML = $window.sessionStorage.getItem("myList");
  });
 
	//alert($rootScope.current);
     $location.path('/about.html');     
};
  
}]);
