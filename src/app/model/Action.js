define(function (require) {
    'use strict';

    let _ = require('underscore');
    let Panel = require('model/Panel');

    let Action = Panel.extend({

        defaults: {
            content: "This is an action",
            goalId: 1
        }

    });

    // merge model schemas
    _.extend(Action.prototype.defaults, Panel.prototype.defaults);

    return Action;

});