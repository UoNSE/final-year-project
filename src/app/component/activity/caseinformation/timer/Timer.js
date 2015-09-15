define(function (require) {
    'use strict';

    var Panel = require('core/Component');
    var template = require('text!component/timer/Timer.hbs');

    return Panel.extend({
        template: template,
        styles: 'component/button/Timer.css',

        initialize: function () {
            Panel.prototype.initialize.apply(this, arguments);
            this.interactive = true;
            this.setDraggable({});
            this.timerInitialize();
            setInterval(this.updateClock(this['update-period)']), this['update-period)']);
        },

        timerInitialize: function(){
            var times = ($('#activity-clock > .panel-body').text()).split(":");
            this.timer += +times[0] * 60 * 60;
            this.timer += +times[1] * 60;
            this.timer += +times[2];
            this.timer *= 1000;
        },

        updateClock: function (period) {
            if (this.timer !== 0) {
                this.timer -= period;
                if (this.timer < 0) {
                    this.timer = 0;
                }
                switch(true){
                    case (this.timer < this.low):
                        $('#activity-clock').addClass('panel-danger').removeClass('panel-warning');
                        this.low = -1;
                        break;
                    case (this.timer < this.mid):
                        $('#activity-clock').addClass('panel-warning').removeClass('panel-success');
                        this.mid = -1;
                        break;
                    default:
                        break;
                }
                $('#activity-clock').text(this.convertTimer(this.timer));
            }
        },

        convertTimer: function(milli) {
            var milliSecs = milli;
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