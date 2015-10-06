define(function (require) {

    "use strict";

    // cards
    let IssueCard = require('component/activity/goals/card/issue/IssueCard');
    let IssueGoalMatch = require('component/activity/goals/card/issuegoal/IssueGoalMatch');
    let GoalCard = require('component/activity/goals/card/goal/GoalCard');
    let ActionCard = require('component/activity/goals/card/action/ActionCard');

    // models
    let GoalModel = require('model/Goal');
    let ActionModel = require('model/Action');
    let ActionGroup = require('model/ActionGroup');
    let IssueGoalPair = require('model/IssueGoalPair');

    // collections
    let ActionsCollection = require('collection/Actions');

    // rule
    let Rule = require('component/activity/goals/match/Rule');


    // Define our rules.

    /**
     * Goal => Action : 'ActionsGroup'.
     *
     * @type {Rule}
     */
    let ActionGroupRule = new Rule((goalCard, actionCard) => {

        let goal = goalCard.model;
        let action = actionCard.model;

        if (goal.matchesAction(action)) {
            let actions = new ActionsCollection();
            actions.add(action);
            return new ActionGroup({
                goal: goal,
                actions: actions
            });
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

    /**
     * Action => ActionsGroup : ActionsGroup
     *
     * @type {Rule}
     */
    let ActionsGroupRule = new Rule((actionCard, actionGroupCard) => {
        let action = actionCard.model;
        let actionGroup = actionGroupCard.model;
        actionGroup.addAction(action);
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

    /**
     * This an example of using an object literal as a rudimentary hashmap.
     *
     * The key is of the form: 'cardClassName' => 'cardClassName'.
     * The above Rules would be defined in each activity, and simply
     * added via CardMatcher.addRule(rule);
     */
    let Rules = {
        'Action => Goal': ActionGroupRule,
        'Goal => Action': ActionGroupRule2,
        'Action => ActionsGroup': ActionsGroupRule,
        'ActionsGroup => Action': ActionsGroupRule2
    };

    /**
     * @class Card Matcher
     * @constructor
     */
    let CardMatcher = function () {
        this.rules = {};
    };

    Object.assign(CardMatcher.prototype, {

        /**
         * This function returns the correct rule matching the
         * specified card types.
         *
         * @param target The class name String of the target Card.
         * @param dropped The class name String of the dropped Card.
         * @returns {T} the Rule matching the target and dropped types.
         */
        match: function (target, dropped) {
            // concatenate the classNames to form a lookup
            let predicate = target.concat(dropped);

            return Object.keys(this.rules).find((rule) => {
                return rule.split(' => ').join('') === predicate;
            });
        },

        /**
         * Add a rule to this matcher.
         *
         * @param key The key to identify this rule. This should be of the
         * form 'className => className'.
         * @param rule The Rule to add.
         */
        addRule: function (key, rule) {
            // create a rule mapping using the given key
            this.rules[key] = rule;
        },

        /**
         * Invoked when a Card is dropped onto another Card. This
         * function handles the matching if required.
         *
         * @param event the 'dragendsink' event.
         */
        matchCards: function (event) {
            let draggable = event.draggable;
            let droppable = event.droppable;
            let matcher = this;

            /**Apply rules to the two Cards involved in a drag and drop event.
             *
             * @param draggable the stationary card.
             * @param droppable the card being dropped onto the draggable.
             * @returns {*} The result of applying the rule matching the
             * given card types.
             */
            return (function () {
                let targetType = draggable.className;
                let droppedType = droppable.className;
                let applicableRule = matcher.match(targetType, droppedType);
                if (applicableRule) {
                    return matcher.rules[applicableRule].execute(draggable, droppable);
                }
            }());
        }

    });


    return CardMatcher;

});