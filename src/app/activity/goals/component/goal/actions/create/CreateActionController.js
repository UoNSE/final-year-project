define(function (require) {

    'use strict';

    var $ = require('jquery');

    var ViewController = require('controller/ViewController');
    var Action = require('model/Action');
    var Animate = require('behaviour/Animate');
    var styles = [
        'goals-actions-activity.css'
    ];

    /**
     * This is the controller for the Goals / Action Activity.
     */
    return ViewController.extend({

        collection: 'Actions',
        styles: styles,

        events: {
            'submit .action-form': '_addAction'
        },

        _onAfterRender: function () {
            console.log('el: ' + this.$el);
        },

        _onReady: function () {
            $('#content').trigger('focus');
        },

        _addAction: function (event) {
            event.preventDefault();
            var id = 1;
            var content = this.$('#content').val();
            var goal = new Action({content: content, goalId: id});
            if (goal.isValid(content)) {
                this.collection.add(goal);
                goal.save();
            }
            $('#back').click();
        }

    });

});
