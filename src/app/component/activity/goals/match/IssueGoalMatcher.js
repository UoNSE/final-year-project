define(function (require) {

    'use strict';

    // templates
    var template = require('text!component/activity/goals/card/matcher/IssueGoalMatcher.hbs');

    // components
    var Component = require('core/Component');
    var GoalCard = require('component/activity/goals/card/goal/GoalCard');

    /**
     * @class IssueGoalMatcher
     */
    return Component.extend({
        events: {},
        template: template,

        initialize: function () {
            Component.prototype.initialize.apply(this, arguments);
            this.setDroppable({types: GoalCard});
        },

        _verifyGoalMatchesIssue() {

        }

    });

});

