define(function (require) {

    'use strict';

    var $ = require('jquery');

    var ViewController = require('controller/ViewController');
    var Animate = require('behaviour/Animate');
    var MultiTouchManager = require('behaviour/MultiTouchManager');
    var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');
    return ViewController.extend({

        events: {
            'mousedown .card': 'onDragStart',
            'mouseup .card': 'onDragEnd'

        },

        onAfterRender: function () {

            var Issues = $('#issues').children();
            var Evidencelist = $('#evidences').children();
            var distance = 375;
            var min = 3 * Math.PI / 4;
            var max = 5 * Math.PI / 4;
            Animate.scale($('.title'));
            var len = Issues.length + Evidencelist.length;
            var i = 0;
            for (; i < Issues.length; i++) {
                var card = $(Issues[i]);
                MultiTouchManager.getInstance().addElementRTS(card);

                //handler to toggle menu visibility
                //card.addEventListener("click", function(){ $( "#menu" ).toggle("fast"); });
                //card.addEventListener("dragend", function(){ $( "#menu" ).toggle("fast"); });

                var angle = min + ((i / len) * (max - min));
                var width = Math.abs($(card.children(0)).width() * 0.5 - $(card.children(1)).width() * 0.5);
                Animate.scale(card, {
                    delay: i * 50,
                    animate: {
                        top: -distance * Math.sin(angle),
                        left: distance * Math.cos(angle) - width
                    }
                });
            }
            for (var l=0; i < len; i++, l++) {
                var card = $(Evidencelist[l]);
                MultiTouchManager.getInstance().addElementRTS(card);
                var angle = min + ((i / len) * (max - min));
                var width = Math.abs($(card.children(0)).width() * 0.5 - $(card.children(1)).width() * 0.5);
                Animate.scale(card, {
                    delay: i * 50,
                    animate: {
                        top: -distance * Math.sin(angle),
                        left: distance * Math.cos(angle) - width
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
        }

    });

});
