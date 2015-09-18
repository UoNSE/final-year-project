define(function (require) {
    'use strict';

    var Panel = require('component/panel/Panel');
    var template = require('text!component/activity/caseinformation/timer/Timer.hbs');
    var activityTimer = 0;
    var gModel = null;          //see below, global ref to model
    var scope3hard5me = null;   //because it is
    return Panel.extend({
        template: template,
        styles: 'component/activity/caseinformation/timer/Timer.css',

        initialize: function () {
            Panel.prototype.initialize.apply(this, arguments);
            this.interactive = true;
            this.setDraggable({});
            this.model.set('color','success');
            debugger;
            scope3hard5me = this.convertTimer;
            gModel = this.model;
            activityTimer = this.timerInitialize(gModel.get('body'));
            setInterval(this.updateClock, gModel.get('update-period'));
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
                activityTimer -= gModel.get('update-period');
                if (activityTimer < 0) {
                    activityTimer = 0;
                }
                switch(true){
                    case (activityTimer < gModel.get('low')):
                        gModel.set('color','danger').set('low',-1);
                        break;
                    case (activityTimer < gModel.get('mid')):
                        gModel.set('color','warning').set('mid',-1);
                        break;
                    default:
                        break;
                }
                $('#activity-clock').text(scope3hard5me(activityTimer));
                //gModel.set('body',scope3hard5me(activityTimer)); // updating the model here seems to make the webpage unresponsive after about 5 seconds
            }
        },

        convertTimer: function(milliSecs) {
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