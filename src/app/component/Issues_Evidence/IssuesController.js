define(function (require) {

    'use strict';

    var $ = require('jquery');

    var ViewController = require('controller/ViewController');
    var Animate = require('behaviour/Animate');
    var MultiTouchManager = require('behaviour/MultiTouchManager');
    var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');
    return ViewController.extend({

        events: {
            //register drag events by mouseup and mousedown (check with touch input)
            'mousedown .card': 'onDragStart',
            'mouseup .card': 'onDragEnd'

        },

        onAfterRender: function () {

            var Issues = $('#issues').children();
            var Evidencelist = $('#evidences').children();
            var distance = 150;
            var width = window.innerWidth/2;
            var height = window.innerHeight/3;
            var len = Issues.length + Evidencelist.length;
            var i = 0;

            for (; i < Issues.length; i++) {
                var card = $(Issues[i]);
                MultiTouchManager.getInstance().addElementRTS(card);

                var angle =  2 * Math.PI * (i / len);
                Animate.scale(card, {
                    delay: i * 50,
                    animate: {
                        top: (distance * Math.cos(angle)) + height,
                        left: (distance * Math.sin(angle)) + width
                    }
                });
            }
            for (var l=0; i < len; i++, l++) {
                var card = $(Evidencelist[l]);
                MultiTouchManager.getInstance().addElementRTS(card);
                var angle = 2 * Math.PI * (i / len);

                Animate.scale(card, {
                    delay: i * 50,
                    animate: {
                        top: (distance * Math.cos(angle)) + height,
                        left: (distance * Math.sin(angle)) + width
                    }
                });
            }
        },

        onDragStart: function(){
            //show menu
            $( "#menu" ).show();
        },

        onDragEnd: function(){
            //hide menu
            $( "#menu" ).hide();
            //check collisions
            //get btn pos
            var pos=jQuery(event.target).offset();
            //debug pos
            //console.log("x: " + pos.left + " y: " + pos.top);
        }

    });

});
