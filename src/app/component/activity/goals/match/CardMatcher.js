define(function (require) {

    "use strict";

    // rule
    let Rule = require('component/activity/goals/match/Rule');


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