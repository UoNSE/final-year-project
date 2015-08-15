define(function (require) {

    'use strict';

    var $ = require('jquery');

    var ViewController = require('controller/ViewController');
    var Goal = require('model/Goal');
    var Animate = require('behaviour/Animate');
    var styles = [
        'goals-actions-activity.css'
    ];

    /**
     * This is the controller for the Goals / Action Activity.
     */
    return ViewController.extend({

        collection: 'Goals',
        styles: styles,

        _onAfterRender: function () {

        },

        _onReady: function () {
            this.listenTo(this.collection, 'add', this.render);
        }

    });

});
