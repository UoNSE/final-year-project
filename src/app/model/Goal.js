define(function (require) {
    "use strict";

    let Backbone = require('backbone');

    /**
     * @class Goal
     */
    return Backbone.Model.extend({

        defaults: {
            content: 'This is a Goal',
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
            return issue && issue.id === this.issueId;
        }

    });

});
