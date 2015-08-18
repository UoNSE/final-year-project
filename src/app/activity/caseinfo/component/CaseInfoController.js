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
        events: {}
    });
});