define(function (require) {
    'use strict';

    let Backbone = require('backbone');

    // components
    let Component = require('core/Component');
    let GoalCard = require('component/activity/goals/card/goal/GoalCard');
    let ActionCard = require('component/activity/goals/card/action/ActionCard');
    let GoalActionsMatch = require('component/activity/goals/card/goalactions/GoalActionsMatch');

    // models
    let GoalModel = require('model/Goal');
    let ActionModel = require('model/Action');
    let ActionGroup = require('model/ActionGroup');
    let HelpModel = require('model/HelpModel');

    // help
    let Help = require('component/activity/goals/help/Help');
    let HelpText = require('text!component/activity/goals/actions/HelpContent.hbs');

    // collections
    let ActionsCollection = require('collection/Actions');
    let GoalsCollection = require('collection/Goals');
    let ActionGroupsCollection = Backbone.Collection.extend({model: ActionModel});

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
    /**
     * The x and y coordinate positions of the Goal cards is calculated
     * as a percentage of the screen.
     *
     * @type {{x: Function, y: Function}}
     */
    let goalCardPositions = {

        x: () => {
            return -(Positioning.widthLimit() * 0.40);
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
        actionGroups: {},
        matches: [],

        collection: {
            actions: new ActionsCollection(),
            goals: new GoalsCollection(),
            actionGroups: new ActionGroupsCollection()
        },

        /**
         * Constructor.
         */
        initialize: function () {
            // invoke super(arguments)
            Component.prototype.initialize.apply(this, arguments);

            this.matches = [];

            let goalsCollection = this.collection.goals;
            let actionsCollection = this.collection.actions;
            let actionsGroupsCollection = this.collection.actionGroups;

            // setup syncing

            this.listenTo(actionsCollection, 'sync', this.onActionsSync);
            this.listenTo(goalsCollection, 'sync', this.onGoalsSync);
            this.listenTo(actionsGroupsCollection, 'add', this.onAddActionGroup);

            // fetch models
            actionsCollection.fetch();
            goalsCollection.fetch();

            this.help = this.add(new Help({
                model: new HelpModel({
                    title: 'Help',
                    width: this.width,
                    helpContent: HelpText
                })
            }));

        },

        /**
         * Todo: handle actionGroup display
         *
         * @param model
         */
        onAddActionGroup: function (model) {
            let match = new GoalActionsMatch({
                model: model
            });

            match.show();

            // storage
            this.add(match);
            this.matches.push(match);

            // positioning
            match.interactive = true;
            this.matches.forEach((element, index, array) => {
                let scale = index - ((array.length - 1) / 2);
                element.position.set(MatchPositioning.x(), scale * 270);
            });
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
         * Todo: this can be improved using the Positioning utility.
         *
         * @param goals The issues collection.
         */
        onGoalsSync: function (goals) {
            var n = goals.size();
            var distance = this.width / 2;
            goals.forEach(function (model, i) {

                // here we assign all these additional attributes to the model,
                // since this enables us to customise the card rendering for this activity
                Object.assign(model.attributes, {
                    width: this.width,
                    title: 'Goal',
                    body: model.get('content'),
                    color: 'light-blue'
                });

                // create card
                var card = this.addGoal(model);

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
        addGoal: function (model) {
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
                dragendsink: this.onDrop.bind(this)
            });
        },

        /**
         *
         *
         * The logic of this function is as follows:
         * 1. Evaluate the types of the components involved and
         * assign them to a known tuple.
         * 2. establish if a match can be made and handle any
         * cleanup as necessary.
         *
         * @param event the event created by the drag
         * and drop interaction.
         */
        onDrop: function (event) {
            let draggable = event.draggable;
            let droppable = event.droppable;

            // check types
            let models = this.assignTypes(draggable, droppable);

            // case: Goal

            let isMatch = this.goalMatchesAction(models);

            if (isMatch) {

                // todo: only remove goals / actions and append  actions to the ActionGroup
                draggable.remove();
                droppable.remove();
            }
        },

        /**
         * Resolves the types of the cards participating in a drag
         * and drop event.
         *
         * todo: handle the case where either parameter is an ActionsGroup.
         *
         * @param draggable the draggable card
         * @param droppable the droppable card
         * @returns {{issue: *, goal: *}}
         */
        assignTypes: function (draggable, droppable) {
            let types = {};

            [draggable, droppable].map(function (card) {
                if (card instanceof ActionCard) {
                    types.action = card.model;
                }
                if (card instanceof GoalCard) {
                    types.goal = card.model;
                }
                if (card instanceof ActionGroup) {
                    types.group = card.model;
                }
            });

            return types;
        },

        /**
         * Goals can match with one or more Actions. This function
         * determines if a Goal matches an Action. If a match is
         * found, the action model will be allocated to an existing
         * group if one exists or else a new group will be created.
         *
         * Can be used as a predicate.
         *
         * todo: the logic of this function could be improved.
         *
         * @param models the object literal with the two objects
         * participating in a drop event.
         * @returns {boolean} {@code true} iff the models match
         * and {@code false} otherwise.
         */
        goalMatchesAction: function (models) {
            let action = models.action;
            let goal = models.goal;
            let actionGroups = this.collection.actionGroups;

            if (goal.matchesAction(action)) {

                let existingGroup = actionGroups.find((group) => {
                    return group.containsGoal(goal);
                });

                if (existingGroup) {
                    existingGroup.addAction(action);
                }
                else {
                    let actions = new ActionsCollection();
                    actions.add(action);
                    let match = new ActionGroup({
                        title: 'Match',
                        goal: goal,
                        actions: actions,
                        color: 'light-green',
                        width: this.width
                    });
                    actionGroups.add(match);
                }
                return true;
            }
            return false;
        }

    });

});