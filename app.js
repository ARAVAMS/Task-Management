const database = require('./js/database');

function checkTime(i) {
    i = (i < 1) ? 0 : i;
    if (i < 10) i = "0" + i;  // add zero in front of numbers < 10
    return i;
}

var myApp = angular.module('cbTimer',[]);

/**
 * @ngservice initService
 * @param $rootScope
 */
myApp.service('initService', function($rootScope) {
    //initialize schedule list
    this.timeSchedule = {
        history: []
    };
});

/**
 *  @ngcontroller cbTimerCtrl
 *  @params  $scope, $timeout, $initService
 *  handle toggling between modes, and binding data
 */
myApp.controller('cbTimerCtrl', ['$scope', '$timeout','initService', function ($scope, $timeout, initService) {
var eatTimerCtrl= this;

    //$scope.data.names[index].timeStart = 0;
    //$scope.data.names[index].timeEnd = 0;
    $scope.startMode="Start";
    $scope.timeSchedule = initService.timeSchedule;
    
    

    /**
     *  @func $scope.startTimer
     *  tr
	 igger timer to start, 
     *  recursive, call again when timer expires
     */
    $scope.startTimer = function (index) {
		//$scope.data.names[index].pauseRunning=false;
    //alert($scope.data.names[index].pauseRunning)
        //$scope.data.names[index].mode = "Stop";
        //alert($scope.data.names[index].timeStart);
        // compute for the duration, 
        // normalize for the user
        var endToday = new Date();
        $scope.data.names[index].timeEnd = endToday.getTime();
        var ms = Math.floor(($scope.data.names[index].timeEnd -  $scope.data.names[index].timeStart)/1000);
        var h =  checkTime(Math.floor(ms/3600));
            ms = Math.floor(ms%3600);
        var m = checkTime(Math.floor(ms/60));
            ms = Math.floor(ms%60);
        var s = checkTime(Math.floor(ms));
        // normalize time string
       $scope.data.names[index].timer = h + ":" + m + ":" + s;
        //alert($scope.data.names[index].timer);
        // timer expired, restart timer
        $scope.data.names[index].tmPromise = $timeout(function () {
            $scope.startTimer(index);
        }, 500);

    };

    /**
     * @func $scope.stopTimer
     * handle end of timer
     */
    $scope.stopTimer = function (index) {
       // var dt = new Date();
        //alert(index);
		
        // toggle
       //$scope.data.names[index].mode = "Start";
        $scope.data.names[index].timerRunning = false;
		 $scope.data.names[index].pauseRunning=false;
		 $scope.data.names[index].resumeRunning = false; 
        // stop timeout service
		
        $timeout.cancel($scope.data.names[index].tmPromise); 
        
        // add to history
        $scope.timeSchedule.history.push([$scope.data.names[index].projectName,$scope.data.names[index].taskName,
        $scope.data.names[index].timeStart,$scope.data.names[index].timeEnd,
                                          ($scope.data.names[index].timeEnd-$scope.data.names[index].timeStart)/1000]);
                                          
         database.addTask($scope.data.names[index].projectName,$scope.data.names[index].taskName,$scope.data.names[index].timeStart,$scope.data.names[index].timeEnd);
		                               
                                          
    };
	
	
	 $scope.pauseTimer = function (index) {
		 $scope.data.names[index].pauseRunning=false;
		$scope.data.names[index].resumeRunning = true; 
		$timeout.cancel($scope.data.names[index].tmPromise); 
	 };
	 
	  $scope.resumeTimer = function (index) {
		 $scope.data.names[index].pauseRunning=true;
		$scope.data.names[index].resumeRunning = false;
       $scope.data.names[index].tmPromise = $timeout(function () {
            $scope.startTimer(index);
        });		
	 };

    /**
     *  @func $scope.toggleTimer
     *  toggle between modes
        */
    $scope.toggleTimer = function (index) {
    $scope.data.names[index].timerRunning = true; 
	
     $scope.data.names[index].pauseRunning=true;	
        var startToday = new Date();
            $scope.data.names[index].timeStart = startToday.getTime();    
            $scope.startTimer(index);
         }; 

    $scope.data ={
       names:[{ taskName:"",projectName:"",timer:"",timerRunning:""}]
   };
    
    $scope.addRow = function(index){
    var name = {taskName:"",projectName:"",timer:"",timerRunning:""};
       
		
		$scope.data.names.push({taskName:"",projectName:"",timer:"",timerRunning:""
      });
    };
  
  $scope.deleteRow = function($event,name){
  var index = $scope.data.names.indexOf(name);
    if($event.which == 1)
       $scope.data.names.splice(index,1);
    };

}]);
