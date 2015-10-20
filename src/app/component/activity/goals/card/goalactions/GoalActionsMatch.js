define(function (require) {
    "use strict";

    // templates
    var template = require('text!component/activity/goals/card/goalactions/GoalActionsMatch.hbs');
    // components
    var Card = require('component/activity/goals/card/Card');
    var ActionCard = require('component/activity/goals/card/action/ActionCard');

    /**
     * @class IssueGoalMatch
     */
    return Card.extend({

        template: template,

        initialize: function () {
            // super(arguments)
            Card.prototype.initialize.apply(this, arguments);
            this.className = 'GoalActionsMatch';
            this.setInteractive();
            this.setDroppable({types: ActionCard});
        }

    });

});