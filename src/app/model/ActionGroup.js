define(function (require) {
    "use strict";

    var Backbone = require('backbone');

    var Goal = require('model/Goal');
    var Action = require('model/Action');

    return Backbone.RelationalModel.extend({

        defaults: {
            goal: null,
            actions: null
        },

        relations: [{
            type: Backbone.HasOne,
            key: 'goal',
            relatedModel: Goal
        }, {
            type: Backbone.HasMany,
            key: 'actions',
            relatedModel: Action
        }],

        /**
         * Useful for function predicates, when determining whether you
         * need to construct a new ActionGroup for a Goal.
         *
         * @param goal the predicate goal to test.
         * @returns {boolean} {@code true} if this ActionGroup
         * contains the {@param goal} and {@code false} otherwise.
         */
        containsGoal: function (goal) {
            return this.get('goal').get('id') === goal.get('id');
        },

        /**
         * Adds an action to this sub-model collection of Actions.
         *
         * @param action the Action model to add.
         */
        addAction: function (action) {
            this.get('actions').add(action);
        }

    });

});
