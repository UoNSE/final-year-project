define(function (require) {

    'use strict';

    var $ = require('jquery');

    var Animate = require('behaviour/Animate');
    var ViewController = require('controller/ViewController');

    var styles = [
        'goals-actions-activity.css'
    ];

    /**
     * This is the controller for the Goals / Action Activity.
     */
    return ViewController.extend({

        collection: 'Goals',

        styles: styles,

        events: {

        },

        onAfterRender: function () {

        },

        onBeforeRender: function () {
            var selector = '.media-list.row.goals-container';
            this.collection.each(function (model) {
                this.addChildView(selector, 'activity/goals/component/goal/Goal', {
					model: model
				});
            }.bind(this));
        },

        onReady: function () {
            this.listenTo(this.collection, 'add', this.render);
        }

    });

});
