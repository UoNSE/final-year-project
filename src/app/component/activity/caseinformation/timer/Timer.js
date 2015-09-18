define(function (require) {
    'use strict';

    var Panel = require('component/panel/Panel');
    var template = require('text!component/activity/caseinformation/timer/Timer.hbs');
    var activityTimer = 0;
    var period = 0;
    return Panel.extend({
        template: template,
        styles: 'component/activity/caseinformation/timer/Timer.css',

        initialize: function () {
            Panel.prototype.initialize.apply(this, arguments);
            this.interactive = true;
            this.setDraggable({});
            this.model.set('color','success');
            debugger;
            period = this.model.get('update-period');
            activityTimer = this.timerInitialize(this.model.get('body'));
            setInterval(this.updateClock, period);
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
            if (activityTimer !== 0) {
                activityTimer -= period;
                if (activityTimer < 0) {
                    activityTimer = 0;
                }
                switch(true){
                    case (activityTimer < this.low):
                        $('#activity-clock').addClass('panel-danger').removeClass('panel-warning');
                        this.low = -1;
                        break;
                    case (activityTimer < this.mid):
                        $('#activity-clock').addClass('panel-warning').removeClass('panel-success');
                        this.mid = -1;
                        break;
                    default:
                        break;
                }
                $('#activity-clock').text(this.convertTimer());
            }
        },

        convertTimer: function() {
            var milliSecs = activityTimer;
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