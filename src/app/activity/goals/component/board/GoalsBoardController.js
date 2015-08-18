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
            'keyup .goal-content-search': 'searchGoals'
        },

        onAfterRender: function () {
            Animate.scale($(''), {
                css: {width: 150, height: 200, fontSize: 20},
                delay: 500,
                duration: 1000
            });
        },

        onBeforeRender: function () {
            var selector = '.media-list.row.goals-container';
            this.collection.each(function (model) {
                this.addChildView(selector, 'activity/goals/component/actions/action/Action', {
					model: model
				});
            }.bind(this));
        },

        onReady: function () {
            this.listenTo(this.collection, 'add', this.render);
        }

    });

});
