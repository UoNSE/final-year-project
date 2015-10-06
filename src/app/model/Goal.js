define(function (require) {
    "use strict";

    let _ = require('underscore');
    let Panel = require('model/Panel');

    /**
     * @class Goal
     */
    let GoalModel = Panel.extend({

        defaults: {
            /**
             * The content text of the Goal.
             */
            content: '',
            /**
             * The matching issue identifier.
             */
            issueId: '0',
            /**
             * An array of identifiers for the actions that
             * should be matched to this Goal.
             */
            actions: [1],
            /**
             * A marker for the Goal being completed. This
             * allows the ChooseGoal Activity to distinguish between
             * goals that have already been matched with actions.
             */
            complete: false
        },

        initialize: function () {
            // invoke super(arguments)
            Panel.prototype.initialize.apply(this, arguments);
        },

        /**
         * Verify that this Goal matches an Issue.
         *
         * @param issue the Issue to check.
         * @return true if this goal matches the parameter issue.
         */
        matchesIssue: function (issue) {
            let issueId = parseInt(this.get('issueId'));
            return issue && issue.id === issueId;
        },

        /**
         * Verify that an Action matches this Goal.
         *
         * @param action the Action to check.
         * @return true if this goal matches the parameter action.
         */
        matchesAction: function (action) {
            return action && this.get('actions')
                    .filter((actionId) => actionId === action.get('id'))
                    .length > 0;
        },

        /**
         * This overrides the the default behaviour of Backbone.Model.save, such that
         * only the goal attributes are persisted.
         *
         * Note: Models which extend from other models (in this case Goals extends Panel)
         * and hence inherit attributes, these attributes would otherwise be persisted.
         *
         * @override
         */
        save: function () {

            /**
             * Only persist Goal related attributes.
             */
            this.attributes = {
                id: this.get('id'),
                content: this.get('content'),
                issueId: this.get('issueId'),
                actions: this.get('actions'),
                complete: this.get('complete')
            };

            // invoke super(arguments)
            Backbone.Model.prototype.save.apply(this, arguments);
        }

    });

    // merge model schemas
    _.extend(GoalModel.prototype.defaults, Panel.prototype.defaults);

    return GoalModel;

});
