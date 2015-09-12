define(function (require) {

    'use strict';

    // templates
    let template = require('text!component/activity/goals/list/CardList.hbs');

    // components
    let Component = require('core/Component');
    let Card = require('component/activity/goals/card/Card');

    /**
     * @class CardList
     */
    return Component.extend({

        template: template,

        initialize: function () {
            Card.prototype.initialize.apply(this, arguments);
        }

    });

});