define(function (require) {
    "use strict";

    let _ = require('underscore');
    let Panel = require('model/Panel');

    /**
     * @class Goal
     */
    let GoalModel = Panel.extend({

        defaults: {
            content: '',
            issueId: '0',
            actions: [1]
        },

        /**
         * Verify that this Goal matches an Issue.
         *
         * @param issue the Issue to check.
         * @return true if this goal matches the parameter issue.
         */
        matchesIssue: function (issue) {
            return issue && issue.id === this.get('issueId');
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
        }

    });

    // merge model schemas
    _.extend(GoalModel.prototype.defaults, Panel.prototype.defaults);

    return GoalModel;

});
