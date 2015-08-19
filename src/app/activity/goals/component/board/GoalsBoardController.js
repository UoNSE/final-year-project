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
            // TODO Hack
            this.$el.find('#goals-activity-container').height(200 + this.collection.size() * 50);
        },

        onBeforeRender: function () {
            var selector = '#goals-activity-container ul.row.goals-list';
            this.collection.each(function (model) {
                debugger;
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
