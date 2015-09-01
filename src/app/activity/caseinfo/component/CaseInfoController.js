define(function (require) {

    'use strict';

    var $ = require('jquery');
    var MultiTouchManager = require('behaviour/MultiTouchManager');
    var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');
    var ViewController = require('controller/ViewController');
    var Animate = require('behaviour/Animate');

    var CLOCK_TIMEOUT = 1000;
    var CLOCK_MID = 600000;
    var CLOCK_LOW = 300000;
    var ACTIVITY_TIMER = 0;
    var issues = {};
    var hiddenCards;
    var sCounter = 0;

    function issueTrack(){
        //track individual issues that are revealed to pass to Issues/Evidence activity
    }

    function showHidden(text) {
        if ((text.attr('issue')) != null){
            ++sCounter;
            $('.hidden-info').each(function() {
                if ($(this).attr('threshold') <= sCounter){
                    $(this).removeClass('.hidden-info').fadeIn(2500);
                }
            });
        }

    }

    function init() {
        hiddenCards = $('.hidden-info').css('display', 'none');/*.each(function() {
            //hidden.push($(this).attr('id'));
        });*/
        var times = ($('#activity-clock').text()).split(":");
        ACTIVITY_TIMER += +times[0]*60*60;
        ACTIVITY_TIMER += +times[1]*60;
        ACTIVITY_TIMER += +times[2];
        ACTIVITY_TIMER *= 1000;
    }

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
        ACTIVITY_TIMER -= CLOCK_TIMEOUT;
        if (ACTIVITY_TIMER < CLOCK_LOW) {
            $('#activity-clock').addClass('activity-clock-low');
            CLOCK_LOW = -1;
        } else if (ACTIVITY_TIMER < CLOCK_MID){
            $('#activity-clock').addClass('activity-clock-mid');
            CLOCK_MID = -1;
        }
        $('#activity-clock').text(convertTimer(ACTIVITY_TIMER));
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
            'click .btn-kept':'restoreCard',
            'click .list-item' : 'selectListItem'
            //'click .content-media': 'selectMediaItem'
        },

        onReady: function () {
            setInterval(updateClock, CLOCK_TIMEOUT);
            init();
        },

        keepCard: function (event) {
            $(event.target).removeClass('btn-keep').addClass('btn-kept').parents('.infocard').animate({
                opacity: 0.5,
                top: "+=500"
            }, 500, null);
        },

        restoreCard: function (event) {
            $(event.target).removeClass('btn-kept').addClass('btn-keep').parents('.infocard').animate({
                opacity: 1,
                top: "-=500"
            }, 500, null);
        },

        selectListItem: function (event) {
            var item = $(event.target);

            if (!(item.hasClass('inv-list-item'))) {
                if (item.hasClass('selected-text')){
                    $("#list-"+item.attr('id')).remove();
                    --sCounter;
                } else {
                    showHidden(item);
                    item.clone().attr('id','list-'+item.attr('id')).addClass('inv-list-item well').appendTo($('.inventory').find('ul'));
                }
            } else {
                var id = item.attr('id');
                item.remove();
                --sCounter;
                item = $("#"+(id.slice(5,id.length)));
            }
            item.toggleClass('selected-text');
        },

        onAfterRender: function () {
            this.addChildView('.background', 'component/inventory/Inventory', {
                append: true
            });
            //this._addItems();
        }

    });
});