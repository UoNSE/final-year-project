define(function (require) {

    'use strict';

    // templates
    let template = require('text!component/activity/goals/Goals.hbs');

    // components
    let Component = require('core/Component');
    let GoalCard = require('component/activity/goals/card/goal/GoalCard');
    let IssueCard = require('component/activity/goals/card/issue/IssueCard');

    // collections
    let IssuesCollection = require('collection/Issues');
    let GoalsCollection = require('collection/Goals');

    // models

    /**
     * @class Goals
     * @classdesc The view class for Goals Action Activity.
     */
    return Component.extend({
        template: template,
        collection: {
            issues: new IssuesCollection(),
            goals: new GoalsCollection()
        },

        initialize: () => {
            // invoke super(arguments)
            Component.prototype.initialize.apply(this, arguments);

        },

        /**
         * Iterates through the issue collection and adds the cards to the view.
         *
         * @param model The issue model.
         * @returns {IssueCard}
         */
        addIssue: function (model) {
            return this.add(new IssueCard({
                model: model
            }));
        }

    });

});