define(function (require) {

    "use strict";


    /**
     * A Rule represents a piece of logic that can be executed
     * in the event of a drag and drop, as defined by the types
     * of the cards involved.
     *
     * @param transform the function that handles the transformation
     * of two cards.
     * @constructor
     */
    let Rule = function (transform) {
        this.transform = transform;
    };

    /**
     * This is the skeleton for the 'transform' function that needs
     * to be passed to each rule.
     *
     * @param target The target Card.
     * @param dropped The Card that was dropped.
     */
    Object.assign(Rule.prototype, {
        execute: function (target, dropped) {
            return this.transform(target, dropped);
        }
    });


    return Rule;

});