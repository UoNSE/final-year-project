define(function (require) {

    'use strict';

    var $ = require('jquery');
    var MultiTouchManager = require('behaviour/MultiTouchManager');
    var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');
    var ViewController = require('controller/ViewController');
    var Animate = require('behaviour/Animate');

    //var clockTimeout = 1000;
    var activityTimer = 0;
    var CLOCK_TIMEOUT = 1000;
    var CLOCK_MID = 600000;
    var CLOCK_LOW = 300000;
    var ACTIVITY_TIMER = 0;
    var issues = {};
    var hiddenCards;
    var sCounter = 0;


    function showHidden(text) {
        if ((text.attr('issue')) != null) {
            ++sCounter;
            $('.hidden-info').each(function () {
                if ($(this).attr('threshold') <= sCounter) {
                    $(this).removeClass('.hidden-info').fadeIn(2500);
                }
            });
        }

    }

    function init() {
        hiddenCards = $('.hidden-info').css('display', 'none');
        /*.each(function() {
         //hidden.push($(this).attr('id'));
         });*/
        var times = ($('#activity-clock').text()).split(":");
        ACTIVITY_TIMER += +times[0] * 60 * 60;
        ACTIVITY_TIMER += +times[1] * 60;
        ACTIVITY_TIMER += +times[2];
        ACTIVITY_TIMER *= 1000;
    }

    function convertTimer(milli) {
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
        return "Time Remaining \n" + numHours + ":" + numMins + ":" + numSecs;
    }

    function updateClock() {
        if (ACTIVITY_TIMER !== 0) {
            ACTIVITY_TIMER -= CLOCK_TIMEOUT;
            if (ACTIVITY_TIMER < 0) {
                ACTIVITY_TIMER = 0;
            }
            switch(true){
                        case (ACTIVITY_TIMER < CLOCK_LOW):
                                    console.log("HINT");
                                    $('#infocard-3>.card-content').css('box-shadow', '0 0 50px blue');
                                    $('#activity-clock').addClass('activity-clock-low').removeClass('activity-clock-mid');
                                    CLOCK_LOW = -1;
                                    $('#activity-clock').text(convertTimer(ACTIVITY_TIMER));
                                    break;
                        case (ACTIVITY_TIMER < CLOCK_MID):
                                    console.log("HINT");
                                    $('#infocard-1>.card-content').css('box-shadow', '0 0 50px blue');
                                    $('#activity-clock').addClass('activity-clock-mid').removeClass('activity-clock-high');
                                    CLOCK_MID = -1;
                                    $('#activity-clock').text(convertTimer(ACTIVITY_TIMER));
                                    break;
                        default:
                                    $('#activity-clock').text(convertTimer(ACTIVITY_TIMER));
                                    break;
            }
        }
    }

    return ViewController.extend({
        //hide back button

        displayBack: false,
        multitouch: MultiTouchManager.getInstance(),
        styles : 'case-info.css',

        //model collection - not needed???
        //collection: 'CaseInfos',

        //events
        events: {
            'click .btn-keep':'keepCard',
            'click .btn-kept':'restoreCard',
            'click .list-item' : 'selectListItem'
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
                if (item.hasClass('selected-text')) {
                    $("#list-" + item.attr('id')).remove();
                    --sCounter;
                } else {
                    showHidden(item);
                    item.clone().attr('id', 'list-' + item.attr('id')).addClass('inv-list-item well').css('box-shadow', '-3px 1px 6px 0 rgba(0,0,0,0.12)').appendTo($('.inventory').find('ul'));
                }
            } else {
                var id = item.attr('id');
                item.remove();
                --sCounter;
                item = $("#" + (id.slice(5, id.length)));
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

/*

var resources = disp( $( ".infocard" ).toArray().reverse() );
             var transforms = [
                [glm.vec3.fromValues(300, 100, 0), glm.vec3.fromValues(0.5, 0.5, 1), 0],
                [glm.vec3.fromValues(-300, 0, 0), glm.vec3.fromValues(0.5, 0.5, 1), 0],
                [glm.vec3.fromValues(0, 100, 0), glm.vec3.fromValues(0.5, 0.5, 1), 0],
                [glm.vec3.fromValues(300, -100, 0), glm.vec3.fromValues(0.5, 0.5, 1), 0],
                [glm.vec3.fromValues(0, -100, 0), glm.vec3.fromValues(1, 1, 1), 0]
             ];

            function disp( divs ) {
              var a = [];
              for ( var i = 0; i < divs.length; i++ ) {
                a.push( divs[ i ].innerHTML );
              }
              $( "span" ).text( a.join( " " ) );
              return a;
            }


            	var numItems = resources.length;
            	//var container = $('.card-content');
            	var container = $('<div class="abs-center"></div>');
            	container.appendTo($('.infocard'));
            	for (var i = 0; i < numItems; i++) {
            		var element = $(resources[i]);
            		element.addClass("abs-center").appendTo(container);
            		element.css('transform', transforms[i]);
            		//var colors = ['#ff0000', '#ffffff', '#d4ee9f'];
            		//element.css('backgroundColor', colors[Math.floor(Math.random() * colors.length)]);
            		var multiTouchElement = this.multitouch.addElement(element);
            		var behaviour = new RotateTranslateScaleBehaviour(multiTouchElement);
            		multiTouchElement.addBehaviour(behaviour);
            		glm.vec3.copy(behaviour.translation, transforms[i][0]);
            		glm.vec3.copy(behaviour.scale, transforms[i][1]);
            		glm.vec3.copy(behaviour.rotation, transforms[i][2]);
            		behaviour.needsUpdate();
            		this.elements = this.elements.add(element);
            	}
            animate.scale(container);
*/
