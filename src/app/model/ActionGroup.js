define(function (require) {
    "use strict";

    var SerializableModel = require('model/SerializableModel');

    var Goal = require('model/Goal');
    var Action = require('model/Action');

    return SerializableModel.extend({

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
         * Adds an action to this sub-model collection of Actions,
         * iff they match.
         *
         * @param action the Action model to add.
         */
        addAction: function (action) {
            if (this.matchesAction(action)) {
                this.get('actions').add(action);
            }
        },

        /**
         * Determines if the parameter action is associated with the Goal
         * model that is stored within this ActionGroup.
         *
         * @param action the Action model instance.
         * @returns {boolean}
         */
        matchesAction: function (action) {
            return this.get('goal').matchesAction(action);
        },

        /**
         * Returns true iff this ActionGroup is fully matched:
         * that all actions have been added.
         *
         * @returns {boolean}
         */
        isComplete: function () {
            let goal = this.get('goal');
            let actions = this.get('actions');
            let actionIds = goal.get('actions');

            // since actions can only be added if they pass a match condition
            // comparing the lengths of the two arrays will suffice
            return actionIds.length === actions.length;
        }

    });

});
