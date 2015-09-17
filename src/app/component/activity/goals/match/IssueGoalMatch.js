define(function (require) {

    'use strict';

    // templates
    var template = require('text!component/activity/goals/match/IssueGoalMatch.hbs');
    // components
    var Component = require('core/Component');

    /**
     * @class IssueGoalMatch
     */
    return Component.extend({

        template: template,

        initialize: function () {
            // super(arguments)
            Component.prototype.initialize.apply(this, arguments);
            this.interactive = true;
        }

    });

});

