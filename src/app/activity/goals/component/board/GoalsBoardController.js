define(function (require) {

    'use strict';

    var Animate = require('behaviour/Animate');
    var ViewController = require('controller/ViewController');

    var template = require('text!activity/goals/component/board/GoalsBoardView.html');

    var Goals = require('collection/Goals');
    var GoalController = require('activity/goals/component/goal/GoalController');

    /**
     * This is the controller for the Goals / Action Activity.
     */
    return ViewController.extend({

        template: template,
        collection: new Goals(),
        styles: 'goals-actions-activity.css',

        initialize: function () {
            ViewController.prototype.initialize.apply(this, arguments);
            this.listenTo(this.collection, 'sync', this.onSync);
            this.collection.fetch();
            this.render();
        },

        onSync: function () {
            var selector = '#goals-activity-container ul.row.goals-list';
            this.collection.each(function (model) {
                this.addNestedView(selector, new GoalController({
                    model: model
                }));
            }.bind(this));

            this.listenTo(this.collection, 'add', this.render);
        },

        onAfterRender: function () {
            // TODO Hack
            this.$el.find('#goals-activity-container').height(200 + this.collection.size() * 50);
        }

    });

});
