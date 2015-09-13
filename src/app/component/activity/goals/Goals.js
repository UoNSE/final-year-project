define(function (require) {
    'use strict';

    // components
    let Component = require('core/Component');
    let GoalCard = require('component/activity/goals/card/goal/GoalCard');
    let IssueCard = require('component/activity/goals/card/issue/IssueCard');
    let IssueModel = require('model/Issue');
    let IssueGoalMatcher = require('component/activity/goals/match/IssueGoalMatcher');

    // collections
    let IssuesCollection = require('collection/Issues');
    let GoalsCollection = require('collection/Goals');

    // models

    // dimensions
    let height = 100;
    let width = 300;

    /**
     * @class Goals
     * @classdesc The view class for Goals Action Activity.
     */
    return Component.extend({

        collection: {
            issues: new IssuesCollection(),
            goals: new GoalsCollection()
        },

        initialize: () => {
            // invoke super(arguments)
            Component.prototype.initialize.apply(this, arguments);

            let issuesCollection = this.issues;
            let goalsCollection = this.goals;

            // Listen to the sync events on both collections, which waits for the models to be loaded.
            this.listenTo(issuesCollection, 'sync', this.onIssuesSync);
            //this.listenTo(goalsCollection, 'sync', this.onGoalsSync);

            issuesCollection.fetch();
            goalsCollection.fetch();

            // for each goal in goals
            this.goals.forEach((goal)=> {
                // create a GoalCard and
                // append to Goals Container
            });

            // for each issue in issues
            this.issues.forEach((issue)=> {
                // create an IssueMatcher for a particular Goal
            });

        },

        /**
         * An event triggered when the issues collection has synced upon a fetch call.
         *
         * @param issues The issues collection.
         */
        onIssuesSync: function (issues) {
            var n = issues.size();
            var distance = 10;
            issues.forEach(function (model, i) {
                var card = this.addIssue(new IssueModel({
                    width: width,
                    height: height,
                    title: 'Issue',
                    body: model.get('content'),
                    color: 'danger'
                }));
                var scale = i - ((n - 1) / 2);
                card.position.set(-300, scale * (distance + card.model.get('height')));
            }, this);
        },

        /**
         * Iterates through the issue collection and adds the cards to the view.
         *
         * @param model The issue model.
         * @returns IssueGoalMatcher
         */
        addIssue: function (model) {
            return this.add(new IssueGoalMatcher({
                model: model
            }));
        }

    });

});