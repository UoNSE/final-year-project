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

        events: {
            'submit .goal-form': '_addGoal'
        },

        _onAfterRender: function () {
            console.log('el: ' + this.$el);
        },

        _onReady: function () {
            $('#content').trigger('focus');
        },

        _addGoal: function (event) {
            event.preventDefault();
            var content = this.$('#content').val();
            var goal = new Goal({content: content});
            if (goal.isValid(content)) {
                this.collection.add(goal);
                goal.save();
            }
            $('#back').click();
        }

    });

});
