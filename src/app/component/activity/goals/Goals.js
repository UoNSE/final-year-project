define(function (require) {
    'use strict';

    // lib
    let Backbone = require('backbone');
    let _ = require('underscore');

    // components
    let Component = require('core/Component');
    let GoalCard = require('component/activity/goals/card/goal/GoalCard');
    let IssueCard = require('component/activity/goals/card/issue/IssueCard');
    let IssueGoalMatch = require('component/activity/goals/card/issuegoal/IssueGoalMatch');
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
    let MatchCollection = require('collection/IssueGoalMatches');

    // positioning
    let Positioning = require('component/activity/goals/Positioning');

    /**
     * Defines the positioning for Matches, so that
     * they align with the inventory.
     */
    let MatchPositioning = {
        /**
         * The x position.
         */
        x: () => {
            return Positioning.widthLimit() * 0.99
        },
        /**
         * The y position.
         */
        y: () => {
            return Positioning.heightLimit() * 0.15;
        }
    };

    // dimensions
    let height = 100;
    let width = 300;

    /**
     * @class Goals
     * @classdesc The view class for Goals Action Activity.
     */
    return Component.extend({

        height: (function () {
            return Positioning.heightLimit() * 0.05;
        }()),

        width: (function () {
            return Positioning.widthLimit() * 0.40;
        }()),

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
         * Initialise the Activity.
         *
         * @param caseID the id of the selected case, obtained from the URL params.
         */
        initialize: function (caseID) {
            // invoke super(arguments)
            Component.prototype.initialize.apply(this, arguments);

            let matchesCollection = this.collection.matches;

            this.setupFixedComponents(caseID);

            this.setupActivityStartState();

            this.matches = [];
            matchesCollection.map((model) => this.onAddMatch(model));

        },

        /**
         * This sets up the components that are state-invariant.
         *
         * @param caseID the id of the current case.
         */
        setupFixedComponents: function (caseID) {

            // add help component to the page
            this.help = this.add(new Help({
                model: new HelpModel({
                    title: 'Help',
                    width: 300,
                    helpContent: HelpText
                })
            }));

            // add a link to the Actions activity
            this.hiddenActionsActivityLink = this.add(new ActionButton({
                model: {
                    color: 'light-green',
                    classes: 'help-btn actions-btn',
                    icon: 'content-send',
                    href: 'cases/'.concat(caseID, '/activity/actions')
                }
            }));

            this.hiddenActionsActivityLink.position.set(0, 100);

            this.hiddenActionsHint = this.add(new Hint({
                model: {
                    text: "Touch the Green Button to Continue"
                }
            }));

            // hide these components until matching is completed
            this.hiddenActionsActivityLink.hide();
            this.hiddenActionsHint.hide();
        },

        /**
         * Invoked the first time the activity is loaded
         */
        setupActivityStartState: function () {
            // setup syncing
            let issuesCollection = this.collection.issues;
            let goalsCollection = this.collection.goals;

            // Listen to the sync events on both collections, which waits for
            // the models to be loaded.
            this.listenTo(issuesCollection, 'sync', this.onIssuesSync);
            this.listenTo(goalsCollection, 'sync', this.onGoalsSync);
            this.listenTo(this.collection.matches, 'add', this.onAddMatch);

            // fetch issues and goals ready for matching to begin
            issuesCollection.fetch();
            goalsCollection.fetch();

        },

        /**
         * Check if we have matched all issues and goals.
         */
        checkMatches: function () {
            if (this.collection.matches.length === this.collection.goals.length) {
                // activate actions activity link
                this.hiddenActionsActivityLink.show();
                this.hiddenActionsHint.show();
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
                element.position.set(MatchPositioning.x(), scale * 270);
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
            let n = issues.size();
            let separatorDistance = 10; // 10 px
            let matches = this.collection.matches;

            // first filter any issues that we have already matched
            issues.filter((issue) => {

                let existingMatch =
                    matches.find((match) => match.get('issue').id === issue.id);
                return !existingMatch;

            }).forEach(function (model, i) {
                // now create Issue Cards for any unmatched issues

                // use the String to determine size
                let cardHeight = this.determineCardHeight(
                    model.get('content').length
                );

                Object.assign(model.attributes,
                    {
                        width: width,
                        title: 'Issue',
                        body: model.get('content'),
                        color: 'orange'
                    }
                );

                let card = this.addIssue(model);
                let scale = i - ((n - 1) / 2);

                let x = () => {
                    return -(this.width);
                };

                card.position.set(x(), scale * (separatorDistance + cardHeight));

            }, this);
        },

        /**
         * An event triggered when the issues collection has synced upon a fetch call.
         *
         * @param goals The issues collection.
         */
        onGoalsSync: function (goals) {
            var n = goals.size();
            let separatorDistance = 10; // 10 px
            let matches = this.collection.matches;

            // first filter any goals that we have already matched
            goals.filter((goal) => {

                let existingMatch =
                    matches.find((match) => match.get('goal').id === goal.id);
                return !existingMatch;

            }).forEach(function (model, i) {

                // use the String to determine size
                let cardHeight = this.determineCardHeight(
                    model.get('content').length
                );

                Object.assign(model.attributes, {
                    width: this.width,
                    title: 'Goal',
                    body: model.get('content'),
                    color: 'light-blue'
                });

                // create card
                let card = this.addGoal(model);

                let scale = i - ((n - 1) / 2);
                let x = () => {
                    return this.width;
                };
                card.position.set(x(), scale * (separatorDistance + cardHeight));

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
            let types = {};

            [draggable, droppable].map(function (card) {
                if (card instanceof IssueCard) {
                    types.issue = card.model;
                }
                if (card instanceof GoalCard) {
                    types.goal = card.model;
                }
            });

            return types;
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