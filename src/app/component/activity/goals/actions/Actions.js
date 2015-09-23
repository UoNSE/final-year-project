define(function (require) {
    'use strict';

    let Backbone = require('backbone');

    // components
    let Component = require('core/Component');
    let GoalCard = require('component/activity/goals/card/goal/GoalCard');
    let ActionCard = require('component/activity/goals/card/action/ActionCard');

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
    /**
     * Define a new Collection to internally hold matched Issue-Goal paris.
     */
    let ActionGroupsCollection = Backbone.Collection.extend({
        model: ActionGroup
    });

    /**
     * @class Actions
     * @classdesc The view class representing the Activity for
     * matching Actions to Goals.
     */
    return Component.extend({

        height: 100,
        width: 300,

        help: {},
        actionGroups: {},
        matches: {},

        collection: {
            actions: new ActionsCollection(),
            goals: new GoalsCollection(),
            actionGroups: new ActionGroupsCollection()
        },

        initialize: function () {
            // invoke super(arguments)
            Component.prototype.initialize.apply(this, arguments);

            let goalsCollection = this.collection.goals;
            let actionsCollection = this.collection.actions;

            // setup syncing
            this.listenTo(actionsCollection, 'sync', this.onActionsSync);
            this.listenTo(goalsCollection, 'sync', this.onGoalsSync);

            // fetch models
            actionsCollection.fetch();
            goalsCollection.fetch();

            this.help = this.add(new Help({
                model: new HelpModel({
                    title: 'Help',
                    width: 300,
                    helpContent: HelpText
                })
            }));

        },

        onActionsSync: function (actions) {
            var n = actions.size();
            var distance = 10;

            let left = actions.partition();
            let right = actions.partition();

            actions.forEach(function (model, i) {
                // create card
                var card = this.addAction(new ActionModel({
                    width: this.width,
                    title: 'Action',
                    body: model.get('content'),
                    color: 'red'
                }));

                // determine positioning, by partitioning actions
                // by odd and even index, into two x coordinate variants
                let scale = i - ((n - 1) / 2);
                let isOdd = (number) => {
                    return number % 2;
                };
                let x = () => {
                    return isOdd(i) ? 30 : 350;
                };
                let y = () => {
                    return scale * (distance + 50)
                };

                // assign positions
                card.position.set(x(), y());
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
                card.position.set(-300, scale * (distance + cardHeight));
            }, this);

        },

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
            let isMatch = this.goalMatchesAction(models);

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
                if (card instanceof ActionCard) {
                    type.action = card.model;
                }
                if (card instanceof GoalCard) {
                    type.goal = card.model;
                }
            });

            return {
                issue: type.action,
                goal: type.goal
            };
        },

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
                    let actions = new ActionGroupsCollection();
                    let match = new ActionGroup({
                        actions: actions,
                        goal: goal,
                        color: 'light-green',
                        width: width
                    });
                    actions.add(action);
                    actionGroups.add(match);
                }
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
                return goalHeight = this.height * (length / scale);
            }
            return goalHeight;
        }


    });

});