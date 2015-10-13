define(function (require) {
    'use strict';

    var Panel = require('component/panel/Panel');
    var template = require('text!component/activity/caseinformation/timer/Timer.hbs');
    var gTimer = null;   //because it is

    return Panel.extend({
        template: template,

        styles: 'component/activity/caseinformation/timer/Timer.css',

        'activitytimer' : 0,

        initialize: function () {
            gTimer = this;  // binding this for calls to updateClock() made by setInterval()
            Panel.prototype.initialize.apply(this, arguments);
            this.interactive = true;
            this.setDraggable({});
            this.model.set('color','success');
            this.activitytimer = this.timerInitialize(this.model.get('body'));
            setInterval(this.updateClock, this.model.get('update-period'));
        },

        timerInitialize: function(t){
            var times = t.split(":");
            t = 0;
            t += +times[0] * 60 * 60;
            t += +times[1] * 60;
            t += +times[2];
            t *= 1000;
            return t;
        },

        updateClock: function () {
            if (gTimer.activitytimer !== 0) {
                gTimer.activitytimer -= gTimer.model.get('update-period');
                if (gTimer.activitytimer < 0) {
                    gTimer.activitytimer = 0;
                }
                switch(true){
                    case (gTimer.activitytimer < gTimer.model.get('low')):
                        gTimer.model.set('color','danger').set('low',-1);
                        break;
                    case (gTimer.activitytimer < gTimer.model.get('mid')):
                        gTimer.model.set('color','warning').set('mid',-1);
                        break;
                    default:
                        break;
                }
                $('#activity-clock').text(gTimer.timerToString());
                //that.model.set('body',that.timerToString()); // updating the model here seems to make the page unresponsive after about 5 seconds
            }
        },

        timerToString: function() {
            var milliSecs = this.activitytimer;
            var msSecs = (1000);
            var msMins = (msSecs * 60);
            var msHours = (msMins * 60);
            var numHours = ~~(milliSecs / msHours);
            var numMins = ~~((milliSecs - (numHours * msHours)) / msMins);
            var numSecs = ~~((milliSecs - (numHours * msHours) - (numMins * msMins)) / msSecs);
            if (numSecs < 10) {
                numSecs = "0" + +numSecs;
            }
            if (numMins < 10) {
                numMins = "0" + +numMins;
            }
            if (numHours < 10) {
                numHours = "0" + +numHours;
            }
            return numHours + ":" + numMins + ":" + numSecs;
        }
    });
});