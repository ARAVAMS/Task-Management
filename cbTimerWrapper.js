// @todo get $timeout()

var Timer = {

    /**
    * set clock to normalize time
    * @func initTimer
    * 
    * @TODO style clock
    */
    init : function () {
        this.clockface = "00:00:00";
        this.mode = 'Start';
    },

    /**
    * set clock to normalize time
    * @func startTimer
    * 
    * @TODO trigger timer
    */
    startTimer : function () {
        this.setTimer(0);
        this.mode = 'Stop';

    },

     /**
    * set clock to normalize time
    * @func stopTimer
    * 
    * @TODO stop timer
    */
    stopTimer : function () {
        this.setTimer(9);
        this.mode = 'Start';
    },

    /**
    * set clock to normalize time
    * @func setTimer
    * @param intTime integer
    * 
    * @TODO convert integer to time string
    */
    setTimer : function (intTime) {
        if (intTime === 0) {
            this.clockface = "00:00:00";
        } else {
            this.clockface = "99:99:99";
        }
    }
};
