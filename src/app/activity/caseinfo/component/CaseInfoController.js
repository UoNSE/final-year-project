define(function (require) {

    'use strict';

    var $ = require('jquery');
    var MultiTouchManager = require('behaviour/MultiTouchManager');
    var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');
    var ViewController = require('controller/ViewController');
    var Animate = require('behaviour/Animate');

    var clockTimeout = 100;
    var activityTimer = 0;


    function convertTimer(milli){
        var milliSecs = milli;

        var msSecs = (1000);
        var msMins = (msSecs * 60);
        var msHours = (msMins * 60);
        var numHours = Math.floor(milliSecs/msHours);
        var numMins = Math.floor((milliSecs - (numHours * msHours)) / msMins);
        var numSecs = Math.floor((milliSecs - (numHours * msHours) - (numMins * msMins))/ msSecs);



        if (numSecs < 10){
            numSecs = "0" + +numSecs;
        }
        if (numMins < 10){
            numMins = "0" + +numMins;
        }

        if (numHours < 10){
            numHours = "0" + +numHours;
        }

        return numHours + ":" + numMins + ":" + numSecs;
    }

    function updateClock(){
        activityTimer += clockTimeout;
        $('#activity-clock').text(convertTimer(activityTimer));
    }

    return ViewController.extend({
        //hide back button
        displayBack: false,

        //model collection
        collection: 'CaseInfos',

        //events
        events: {
            'click .btn-keep':'keepCard',
            'click .btn-right':'moveRight',
            'click .btn-kept':'restoreCard'
        },

        onReady:function(){
         setInterval(updateClock,clockTimeout);
        },

        keepCard : function(event) {
            $(event.target).removeClass('btn-keep').addClass('btn-right').parents('.well').animate({
                opacity: 0.5,
                top: "+=500",
            }, 500, null);
        },

        moveRight : function(event) {
                    $(event.target).removeClass('btn-right').addClass('btn-kept').parents('.well').animate({
                        opacity: 0.5,
                        left: "+=250",
                    }, 500, null);
                },

        restoreCard : function(event) {
            $(event.target).removeClass('btn-kept').addClass('btn-keep').parents('.well').animate({
                opacity: 1,
                top: "-=500",
            }, 500, null);
        },

    });
});