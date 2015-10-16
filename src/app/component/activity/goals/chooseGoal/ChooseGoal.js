define(function (require) {
    'use strict';

    // components
    let Component = require('core/Component');
    let GoalCard = require('component/activity/goals/card/goal/GoalCard');
    let IssueCard = require('component/activity/goals/card/issue/IssueCard');
    let IssueGoalMatch = require('component/activity/goals/card/issuegoal/IssueGoalMatch');
    let ActionButton = require('component/actionbutton/ActionButton');
    let ActionsActivityLink = require('component/activity/goals/chooseGoal/ActionsActivityLink');

    // help
    var Help = require('component/help/Help');
    var HelpText = require('text!component/activity/goals/chooseGoal/helpContent.hbs');

    // hint
    var Hint = require('component/hint/Hint');

    // models
    var HelpModel = require('model/Help');
    let IssueGoalPair = require('model/IssueGoalPair');

    // collections
    let GoalsCollection = require('collection/Goals');

    // positioning
    let Positioning = require('component/activity/goals/Positioning');

    // rule based matching
    let CardMatcher = require('component/activity/goals/match/CardMatcher');
    let Rule = require('component/activity/goals/match/Rule');

    /**
     * Matches are positioned into two columns. The following functions
     * help determine the positions of these columns and rows as a percentage
     * of the screen.
     *
     * @type {{firstColumn: number, secondColumn: number, row: number}}
     */
    let MatchPositioning = {
        /**
         * The x position of the first column.
         *
         * @returns {number}
         */
        firstColumn: () => {
            return Positioning.widthLimit() * 0.05
        },
        /**
         * The x position of the second column.
         *
         * @returns {number}
         */
        secondColumn: () => {
            return Positioning.widthLimit() * 0.50
        },
        /**
         * The y position.
         */
        row: () => {
            return Positioning.heightLimit() * 0.15;
        }

    };


    /**
     * @class ChooseGoal
     * @classdesc The view class that is an intermission between Goals and Actions,
     * that allows a user to choose a particular Goal.
     */
    return Component.extend({

        height: (function () {
            return Positioning.heightLimit() * 0.05;
        }()),

        width: (function () {
            return Positioning.widthLimit() * 0.40;
        }()),

        /**
         * The case id.
         */
        caseID: 0,

        hiddenLink: {},
        hiddenHint: {},

        /**
         * The help component manages the instructions.
         */
        help: {},
        /**
         * An array of references to the match model instances
         * that have been completed.
         */
        completed: new GoalsCollection(),

        /**
         * The collections managed by this activity.
         */
        collection: {
            goals: new GoalsCollection()
        },

        /**
         * Initialise the Activity.
         *
         * @param caseID the id of the selected case, obtained from the URL params.
         */
        initialize: function (caseID) {

            // invoke super(arguments)
            Component.prototype.initialize.apply(this, arguments);

            this.setupFixedComponents(caseID);

            this.caseID = caseID;

            this.setupActivityStartState();

        },


        /**
         * This sets up the components that are state-invariant.
         *
         * @param caseID the id of the current case.
         */
        setupFixedComponents: function (caseID) {
            //
            //// add help component to the page
            this.help = this.add(new Help({
                model: new HelpModel({
                    title: 'Help',
                    width: 300,
                    body: HelpText
                })
            }));

            // add a link to the overview activity
            this.hiddenLink = this.add(new ActionButton({
                model: {
                    color: 'light-green',
                    classes: 'help-btn actions-btn',
                    icon: 'content-send',
                    href: 'cases/'.concat(caseID, '/overview')
                }
            }));

            this.hiddenLink.position.set(0, 100);

            this.hiddenHint = this.add(new Hint({
                model: {
                    text: "You're finished !! Touch the link to see your accomplishments."
                }
            }));

            // hide these components until all goals are completed
            this.hiddenLink.hide();
            this.hiddenHint.hide();

            this.hint = this.add(new Hint({
                model: {text: 'Choose a Goal to assign Actions'}
            }));

            this.hint.position.set(-50, Positioning.heightLimit() - 100);

        },

        /**
         * Invoked the first time the activity is loaded
         */
        setupActivityStartState: function () {

            // Listen to the sync events on both collections, which waits for
            // the models to be loaded.
            this.listenToOnce(this.collection.goals, 'sync', this.onDefinitionsSync);

            // load data
            this.collection.goals.fetch();

        },

        /**
         * An event triggered when the issues collection has synced upon a fetch call.
         *
         * @param goals The issues collection.
         */
        onDefinitionsSync: function (goals) {

            let n = goals.size();
            let separatorDistance = 10; // 10 px

            let incompleteGoals = goals.filter((goal)=> {

                return goal.get('complete') === false;

            });

            incompleteGoals.forEach(function (model, i) {

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
                let card = this.addDefinition(model);

                let scale = i - ((n - 1) / 2);
                let x = () => {
                    return -50;
                };
                card.position.set(x(), scale * (separatorDistance + cardHeight));

            }, this);

            // if we're done; all goals will be compelete
            if (incompleteGoals.length === 0) {
                this.hint.hide();
                this.hiddenHint.show();
                this.hiddenLink.show();
            }

        },

        /**
         * @param model the Goal model.
         * @returns {Card}
         */
        addDefinition: function (model) {
            return this.createCard(model);
        },

        /**
         * Card Creation Factory.
         *
         * @param model
         * @returns {*}
         */
        createCard: function (model) {

            let activityURL = 'cases/'.concat(this.caseID, '/activity/goals/choose/', model.id, '/actions');

            Object.assign(model.attributes, {
                href: activityURL
            });

            let link = new ActionsActivityLink({
                model: model
            });
            return this.add(link);

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
            // dimensions
            let height = 100;
            let goalHeight = 100;

            const scale = 80;
            if (length > 42) {
                return goalHeight = height * (length / scale);
            }
            return goalHeight;
        }

    });

});