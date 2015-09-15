(define(function (require) {

    'use strict';

    let Card = require('component/activity/goals/card/Card');

    /**
     * @classdesc A Type of Card that can hold a Goal.
     * @name GoalCard
     * @class
     */
    return Card.extend({

        /**
         * Initialisation.
         *
         * @override
         */
        initialize: function () {
            // invoke super(arguments)
            Card.prototype.initialize.apply(this, arguments);
        }

    });

}));