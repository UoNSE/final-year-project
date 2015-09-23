define(function (require) {
    'use strict';

    // lib
    let Backbone = require('backbone');
    let _ = require('underscore');

    // components
    let Component = require('core/Component');
    let GoalCard = require('component/activity/goals/card/goal/GoalCard');
    let IssueCard = require('component/activity/goals/card/issue/IssueCard');
    let IssueGoalMatch = require('component/activity/goals/match/IssueGoalMatch');
    let ActionButton = require('component/actionbutton/ActionButton');

    // help
    var Help = require('component/activity/goals/help/Help');
    var HelpText = require('text!component/activity/goals/help/helpContent.hbs');

    // hint
    var Hint = require('component/hint/Hint');

    // models
    var HelpModel = require('model/HelpModel');
    let IssueModel = require('model/Issue');
    let GoalModel = require('model/Goal');
    let IssueGoalPair = require('model/IssueGoalPair');

    // collections
    let IssuesCollection = require('collection/Issues');
    let GoalsCollection = require('collection/Goals');
    /**
     * Define a new Collection to internally hold matched Issue-Goal paris.
     */
    let MatchCollection = Backbone.Collection.extend({
        model: IssueGoalPair
    });

    // dimensions
    let height = 100;
    let width = 300;

    /**
     * @class Goals
     * @classdesc The view class for Goals Action Activity.
     */
    return Component.extend({

        height: 100,
        width: 300,

        /**
         * The help component manages the instructions.
         */
        help: {},
        hiddenActionsActivityLink: {},
        hiddenActionsHint: {},
        matches: [],

        collection: {
            issues: new IssuesCollection(),
            goals: new GoalsCollection(),
            matches: new MatchCollection()
        },

        /**
         *
         * @param caseID the id of the selected case, obtained from the URL params.
         */
        initialize: function (caseID) {
            // invoke super(arguments)
            Component.prototype.initialize.apply(this, arguments);

            let issuesCollection = this.collection.issues;
            let goalsCollection = this.collection.goals;
            let matchesCollection = this.collection.matches;

            // Listen to the sync events on both collections, which waits for the models to be loaded.
            this.listenTo(issuesCollection, 'sync', this.onIssuesSync);
            this.listenTo(goalsCollection, 'sync', this.onGoalsSync);
            this.listenTo(matchesCollection, 'add', this.onAddMatch);

            issuesCollection.fetch();
            goalsCollection.fetch();

            // add help component to the page
            this.help = this.add(new Help({
                model: new HelpModel({
                    title: 'Help',
                    width: 300,
                    helpContent: HelpText
                })
            }));

            this.hiddenActionsActivityLink = this.add(new ActionButton({
                model: {
                    color: 'light-green',
                    classes: 'help-btn actions-btn',
                    icon: 'content-send',
                    href: 'cases/'.concat(caseID, '/activity/actions')
                }
            }));
            this.hiddenActionsActivityLink.detached = true;
            this.hiddenActionsActivityLink.toggle();

            this.hiddenActionsHint = this.add(new Hint({model: {text:"Now click the green button"}}));
            this.hiddenActionsHint.toggle();
        },

        /**
         * Check if we have matched all issues and goals.
         */
        checkMatches: function () {
            if (this.collection.matches.length === this.collection.goals.length) {
                // activate actions activity link
                this.hiddenActionsActivityLink.toggle();
                this.hiddenActionsHint.toggle();
            }
        },

        /**
         * When an IssueGoalPair is added to its collection,
         * this function is called.
         *
         * @param model the IssueGoalPair
         */
        onAddMatch: function (model) {
            let match = new IssueGoalMatch({
                model: model
            });

            // storage
            this.add(match);
            this.matches.push(match);

            // positioning
            match.interactive = true;
            this.matches.forEach((element, index, array) => {
                let scale = index - ((array.length - 1) / 2);
                element.position.set(730, scale * 270);
            });

            // check if we have matched all goals and issues
            this.checkMatches();
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
                // use the String to determine size
                let cardHeight = this.determineCardHeight(
                    model.get('content').length
                );

                let card = this.addIssue(new IssueModel({
                    width: width,
                    title: 'Issue',
                    body: model.get('content'),
                    color: 'orange'
                }));
                let scale = i - ((n - 1) / 2);
                card.position.set(-300, scale * (distance + cardHeight));
            }, this);
        },

        /**
         * An event triggered when the issues collection has synced upon a fetch call.
         *
         * @param goals The issues collection.
         */
        onGoalsSync: function (goals) {
            var n = goals.size();
            var distance = 10;
            goals.forEach(function (model, i) {

                // use the String to determine size
                let cardHeight = this.determineCardHeight(
                    model.get('content').length
                );

                // create card
                var card = this.addGoal(new GoalModel({
                    width: this.width,
                    title: 'Goal',
                    body: model.get('content'),
                    color: 'light-blue'
                }));

                var scale = i - ((n - 1) / 2);
                card.position.set(300, scale * (distance + cardHeight));
            }, this);

        },

        /**
         * Iterates through the issue collection and adds the cards to the view.
         *
         * @param model The issue model.
         * @returns IssueGoalMatcher
         */
        addIssue: function (model) {
            return this.createDraggableCard(model, IssueCard);
        },

        /**
         * @param model the Goal model.
         * @returns Card
         */
        addGoal: function (model) {
            return this.createDraggableCard(model, GoalCard);
        },

        /**
         * Card Creation Factory.
         *
         * @param model
         * @param CardClass
         * @returns {*}
         */
        createDraggableCard: function (model, CardClass) {
            var card = this.add(new CardClass({
                model: model
            }));
            this.bindDraggableEvents(card);
            return card;
        },

        /**
         * Binds the draggable events to the component.
         *
         * @param component The component to setup.
         */
        bindDraggableEvents: function (component) {
            component.on({
                dragendsink: this.onDrop.bind(this)
            });
        },

        /**
         *
         * @param event
         */
        onDrop: function (event) {
            let draggable = event.draggable;
            let droppable = event.droppable;

            // check types
            let models = this.assignTypes(draggable, droppable);
            let isMatch = this.goalMatchesIssue(models);

            if (isMatch) {
                draggable.remove();
                droppable.remove();
            }
        },

        /**
         * Resolves the types of the parameters .
         *
         * @param draggable the draggable card
         * @param droppable the droppable card
         * @returns {{issue: *, goal: *}}
         */
        assignTypes: function (draggable, droppable) {
            let type = {};

            [draggable, droppable].map(function (card) {
                if (card instanceof IssueCard) {
                    type.issue = card.model;
                }
                if (card instanceof GoalCard) {
                    type.goal = card.model;
                }
            });

            return {
                issue: type.issue,
                goal: type.goal
            };
        },

        /**
         * Checks for a match between an issue and a goal. If a match is found,
         * creates a IssueGoalPair and return true; else return false.
         *
         * @param models the object containing the
         * required model instances.
         * @returns {boolean}
         */
        goalMatchesIssue: function (models) {
            if (models.goal.matchesIssue(models.issue)) {
                let match = new IssueGoalPair({
                    issue: models.issue,
                    goal: models.goal,
                    color: 'light-green',
                    width: width
                });
                this.collection.matches.add(match);
                return true;
            }
            return false;
        },

        /**
         * Determines the appropriate card height, based on
         * the length of the content body.
         *
         * @param length the number of characters in the
         * body of the card.
         * @returns {number} the optimal card height.
         */
        determineCardHeight: function (length) {
            let goalHeight = 100;
            const scale = 80;
            if (length > 42) {
                return goalHeight = height * (length / scale);
            }
            return goalHeight;
        }

    });

});