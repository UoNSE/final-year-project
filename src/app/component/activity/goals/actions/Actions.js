define(function (require) {
    'use strict';

    let Backbone = require('backbone');

    // components
    let Component = require('core/Component');
    let GoalCard = require('component/activity/goals/card/goal/GoalCard');
    let ActionCard = require('component/activity/goals/card/action/ActionCard');
    let GoalActionsMatch = require('component/activity/goals/card/goalactions/GoalActionsMatch');
    let ActionButton = require('component/actionbutton/ActionButton');
    var Hint = require('component/hint/Hint');

    // models
    let GoalModel = require('model/Goal');
    let ActionModel = require('model/Action');
    let ActionGroup = require('model/ActionGroup');
    let HelpModel = require('model/Help');

    // help
    var Help = require('component/help/Help');
    let HelpText = require('text!component/activity/goals/actions/HelpContent.hbs');

    // collections
    let ActionsCollection = require('collection/Actions');
    let GoalsCollection = require('collection/Goals');
    let ActionGroupsCollection = Backbone.Collection.extend({model: ActionModel});

    // rules and card matching
    let Rule = require('component/activity/goals/match/Rule');
    let CardMatcher = require('component/activity/goals/match/CardMatcher');

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
            return Positioning.widthLimit() * 0.40
        },

        /**
         * The y position.
         */
        y: () => {
            return Positioning.heightLimit() * 0.15;
        }

    };

    /**
     * The x and y coordinate positions of the Goal cards is calculated
     * as a percentage of the screen.
     *
     * @type {{x: Function, y: Function}}
     */
    let goalCardPositions = {

        x: () => {
            return -(Positioning.widthLimit() * 0.50);
        },

        y: () => {
            return;
        }

    };

    /**
     * ActionCards are positioned into two columns. The following functions
     * help determine the positions of these columns and rows as a percentage
     * of the screen.
     *
     * @type {{firstColumn: number, secondColumn: number, row: number}}
     */
    let actionCardPositions = {
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
     * @class Actions
     * @classdesc The view class representing the Activity for
     * matching Actions to Goals.
     */
    return Component.extend({

        height: (function () {
            return Positioning.heightLimit() * 0.05;
        }()),

        width: (function () {
            return Positioning.widthLimit() * 0.40;
        }()),

        help: {},
        /**
         * This provides the link to return to the choose goal activity,
         * after actions have been matched with the goal.
         */
        hiddenLink: {},
        /**
         * This provides a hint to click / touch the activity link.
         */
        hiddenHint: {},
        /**
         *
         */
        matches: [],

        /**
         *
         */
        goalID: '',

        /**
         *
         */
        actionCards: [],

        collection: {
            actions: new ActionsCollection(),
            goals: new GoalsCollection(),
            actionGroups: new ActionGroupsCollection()
        },

        /**
         * Rules based card matching.
         */
        cardMatcher: new CardMatcher(),

        /**
         * Constructor.
         */
        initialize: function (caseID, goalID) {
            // invoke super(arguments)
            Component.prototype.initialize.apply(this, arguments);

            this.registerRules();

            this.matches = [];
            this.goalID = goalID;

            let goalsCollection = this.collection.goals;
            let actionsCollection = this.collection.actions;
            let actionsGroupsCollection = this.collection.actionGroups;

            // setup syncing
            this.listenToOnce(actionsCollection, 'sync', this.onActionsSync);
            this.listenToOnce(goalsCollection, 'sync', this.onDefinitionsSync);
            this.listenTo(actionsGroupsCollection, 'add', this.onAddActionGroup);

            // fetch models
            actionsCollection.fetch();
            goalsCollection.fetch();

            this.setupFixedComponents(caseID);

        },

        /**
         * Check if we have matched all goals and actions.
         */
        checkMatches: function () {

            let completed = this.collection.actionGroups.filter((actionsGroup) => {
                return actionsGroup.isComplete();
            });

            if (completed.length > 0) {
                // mark goal as completed
                let goalId = this.goalID;
                let goal = this.collection.goals.get(goalId);

                goal.save({complete: true}, {patch: true});

                // remove all action cards
                this.actionCards.forEach((card)=> {
                    card.remove();
                });

                // activate actions activity link
                this.hiddenLink.show();
                this.hiddenHint.show();
            }

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
                    body: HelpText
                })
            }));

            // add a link to the Actions activity
            this.hiddenLink = this.add(new ActionButton({
                model: {
                    color: 'light-green',
                    classes: 'help-btn actions-btn',
                    icon: 'content-send',
                    href: 'cases/'.concat(caseID, '/activity/goals/choose')
                }
            }));

            this.hiddenLink.position.set(0, 100);

            this.hiddenHint = this.add(new Hint({
                model: {
                    text: "Touch the Green Button to Continue"
                }
            }));

            // hide these components until matching is completed
            this.hiddenLink.hide();
            this.hiddenHint.hide();
        },

        /**
         * Register rules for matching with the CardMatcher.
         */
        registerRules: function () {

            let actionsGroupsCollection = this.collection.actionGroups;

            /**
             * Goal => Action : 'ActionsGroup'.
             *
             * @type {Rule}
             */
            let ActionGroupRule = new Rule(function (goalCard, actionCard) {

                let goal = goalCard.model;
                let action = actionCard.model;

                if (goal.matchesAction(action)) {

                    let actions = new ActionsCollection();

                    actions.add(action);

                    let actionGroup = new ActionGroup({
                        goal: goal,
                        actions: actions
                    });

                    actionsGroupsCollection.add(actionGroup);

                    // remove cards components as they will be
                    // replaced by match components
                    goalCard.remove();
                    actionCard.remove();

                }

            });

            /**
             * Handles other direction: Action => Goal : ActionsGroup
             *
             * @type {Rule}
             */
            let ActionGroupRule2 = new Rule((actionCard, goalCard) => {
                return ActionGroupRule.execute(goalCard, actionCard);
            });

            let actionsActivity = this;

            /**
             * Action => ActionsGroup : ActionsGroup
             *
             * @type {Rule}
             */
            let ActionsGroupRule = new Rule((actionCard, actionGroupCard) => {

                let action = actionCard.model;
                let actionGroup = actionGroupCard.model;

                if (actionGroup.matchesAction(action)) {

                    actionGroup.addAction(action);
                    actionCard.remove();

                    if (actionGroup.isComplete()) {
                        // if we're done, we can remove the component
                        actionGroupCard.remove();
                        // check if this was the last actions group to complete
                        actionsActivity.checkMatches();
                    }
                    else {
                        // re-render the element to include the action
                        actionGroupCard.render();
                    }
                }

            });

            /**
             * Handles other direction:
             * ActionsGroup => Action: ActionsGroup
             *
             * @type {Rule}
             */
            let ActionsGroupRule2 = new Rule((actionGroupCard, actionCard) => {
                return ActionsGroupRule.execute(actionCard, actionGroupCard);
            });

            this.cardMatcher.addRule('Goal => Action', ActionGroupRule);
            this.cardMatcher.addRule('Action => Goal', ActionGroupRule2);
            this.cardMatcher.addRule('Action => GoalActionsMatch', ActionsGroupRule);
            this.cardMatcher.addRule('GoalActionsMatch => Action', ActionsGroupRule2);
        },

        /**
         * @param model
         */
        onAddActionGroup: function (model) {

            if (model.isComplete()) {
                // if we're done, we can remove the component
                //match.remove();
                // check if this was the last actions group to complete
                this.checkMatches();
            }
            else {

                Object.assign(model.attributes, {
                    width: 300
                });

                let match = new GoalActionsMatch({
                    model: model
                });

                this.bindDraggableEvents(match);

                match.show();

                // storage
                this.add(match);
                this.matches.push(match);

                // positioning
                match.setInteractive();
            }


        },

        /**
         * Invoked upon the ActionsCollection having loaded
         * all the models.
         *
         * @param actions the ActionsCollection.
         */
        onActionsSync: function (actions) {
            // shuffle the collection randomly
            actions.shuffle();

            // create a card component for each and position it
            // in a sensible location, relative to the other cards.
            actions.forEach(function (model, i) {

                Object.assign(model.attributes, {
                    width: this.width,
                    title: 'Action',
                    body: model.get('content'),
                    color: 'red'
                });

                // create card
                var card = this.addAction(model);
                this.actionCards.push(card);

                // determine positioning, by partitioning actions
                // by odd and even index, into two x coordinate variants
                this.positionActionCard(i, actions.size(), card);

            }, this);

        },

        /**
         * Determine positioning, by partitioning actions
         * by odd and even index, into two x coordinate variants
         *
         * @param i the index of the actionCard.
         * @param n the size of the collection to position.
         * @param actionCard the ActionCard component to calculate position.
         */
        positionActionCard: function (i, n, actionCard) {
            let scale = i - ((n - 1) / 2);
            let isOdd = (number) => {
                return number % 2;
            };

            let x = () => {
                return isOdd(i) ?
                    actionCardPositions.firstColumn() :
                    actionCardPositions.secondColumn();
            };

            let y = () => {
                return scale * (actionCardPositions.row())
            };

            actionCard.position.set(x(), y());
        },

        /**
         * An event triggered when the issues collection has synced
         * upon a fetch call.
         *
         * @param goals The issues collection.
         */
        onDefinitionsSync: function (goals) {
            var n = goals.size();
            var distance = this.width / 2;

            let goalId = this.goalID;

            goals.filter((goal)=> {

                return goal.id == goalId;

            }).forEach(function (model, i) {

                // here we assign all these additional attributes to the model,
                // since this enables us to customise the card rendering for this activity
                Object.assign(model.attributes, {
                    width: this.width,
                    title: 'Goal',
                    body: model.get('content'),
                    color: 'light-blue'
                });

                // create card
                var card = this.addDefinition(model);

                var scale = i - ((n - 1) / 2);
                card.position.set(goalCardPositions.x(), scale * (distance));
            }, this);
        },

        /**
         * @param model the Action model.
         * @returns {*}
         */
        addAction: function (model) {
            return this.createDraggableCard(model, ActionCard);
        },

        /**
         * @param model the Goal model.
         * @returns Card
         */
        addDefinition: function (model) {
            return this.createDraggableCard(model, GoalCard);
        },

        /**
         * Card Creation Factory.
         *
         * @param model the model instance to assign to the card.
         * @param CardClass the type of Card to create.
         * @returns {*} a Card of the CardClass type.
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
                dragendsink: this.cardMatcher.matchCards.bind(this.cardMatcher)
            });
        }

    });

});