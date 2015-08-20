define(function (require) {

    'use strict';

    var $ = require('jquery');

    var Animate = require('behaviour/Animate');
    var ViewController = require('controller/ViewController');

    var Goals = require('collection/Goals');
    var GoalController = require('activity/goals/component/goal/GoalController');

    var styles = [
        'goals-actions-activity.css'
    ];

    /**
     * This is the controller for the Goals / Action Activity.
     */
    return ViewController.extend({

        collection: new Goals(),
        styles: styles,

        initialize: function () {
            ViewController.prototype.initialize.apply(this, arguments);
            this.collection.fetch();
        },

        onBeforeRender: function () {
            var selector = '#goals-activity-container ul.row.goals-list';
            this.collection.each(function (model) {
                this.addNestedView(selector, new GoalController({
                    model: model
                }));
            }.bind(this));
        },

        onAfterRender: function () {
            // TODO Hack
            this.$el.find('#goals-activity-container').height(200 + this.collection.size() * 50);
        },

        onReady: function () {
            this.listenTo(this.collection, 'add', this.render);
        }

    });

});
