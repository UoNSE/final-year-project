define(function (require) {

    'use strict';

    var $ = require('jquery');
    var MultiTouchManager = require('behaviour/MultiTouchManager');
    var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');
    var ViewController = require('controller/ViewController');
    var Animate = require('behaviour/Animate');

    var clockTimeout = 1000;
    var activityTimer = 0;


    function convertTimer(milli){
        var milliSecs = milli;
        var msSecs = (1000);
        var msMins = (msSecs * 60);
        var msHours = (msMins * 60);
        var numHours = ~~(milliSecs/msHours);
        var numMins = ~~((milliSecs - (numHours * msHours)) / msMins);
        var numSecs = ~~((milliSecs - (numHours * msHours) - (numMins * msMins))/ msSecs);

        if (numSecs < 10){
            numSecs = "0" + +numSecs; }
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

        styles : 'case-info.css',

        //model collection - not needed???
        //collection: 'CaseInfos',

        //events
        events: {
            'click .btn-keep':'keepCard',
            'click .btn-kept':'restoreCard'
        },

        onReady: function () {
            setInterval(updateClock, clockTimeout);
        },

        keepCard: function (event) {
            $(event.target).removeClass('btn-keep').addClass('btn-kept').parents('.card').animate({
                opacity: 0.5,
                top: "+=500"
            }, 500, null);
        },

        restoreCard: function (event) {
            $(event.target).removeClass('btn-kept').addClass('btn-keep').parents('.card').animate({
                opacity: 1,
                top: "-=500"
            }, 500, null);
        },

        onAfterRender: function () {
            this.addChildView('.background', 'component/inventory/Inventory', {
                append: true
            });
            //this._addItems();
        }

    });
});