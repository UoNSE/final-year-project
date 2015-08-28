define(function (require) {

    'use strict';

    var $ = require('jquery');

    var ViewController = require('controller/ViewController');

    var template = require('text!activity/goals/component/create/CreateGoalView.html');

    var Goal = require('model/Goal');
    var Animate = require('behaviour/Animate');
    var styles = [
        'goals-actions-activity.css'
    ];

    /**
     * This is the controller for the Goals / Action Activity.
     */
    return ViewController.extend({

        template: template,
        collection: 'Goals',
        styles: styles,

        events: {
            'click #submit-button': 'onAddGoal'
        },

        onAddGoal: function (event) {
            var $goal = this.$el.find('input[name="goal"]');
            var goal = new Goal({content: $goal.val()});
            if (goal.isValid()) {
                this.collection.add(goal);
                goal.save();
            }
        }

    });

});
