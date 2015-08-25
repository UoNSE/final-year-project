define(function (require) {

    'use strict';

    var $ = require('jquery');
    var MultiTouchManager = require('behaviour/MultiTouchManager');
    var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');
    var ViewController = require('controller/ViewController');
    var Animate = require('behaviour/Animate');

    return ViewController.extend({
        //hide back button
        displayBack: false,

        //model collection
        collection: 'CaseInfos',

        //events
        events: {
            'click .btn-keep':'keepCard',
            'click .btn-kept':'restoreCard'
        },

        keepCard : function(event) {
            $(event.target).removeClass('btn-keep').addClass('btn-kept').parents('.well').animate({
                opacity: 0.5,
                top: "+=250",
            }, 500, null);
        },

        restoreCard : function(event) {
            $(event.target).removeClass('btn-kept').addClass('btn-keep').parents('.well').animate({
                opacity: 1,
                top: "-=250",
            }, 500, null);
        }

    });
});