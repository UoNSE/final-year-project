define(function (require) {
    'use strict';

    let Page = require('core/Page');

    let InventoryModel = require('model/Inventory');
    let Inventory = require('component/inventory/Inventory');

    let Goals = require('component/activity/goals/Goals');

    /**
     * @class Goals
     */
    return Page.extend({

        name: 'goals',

        title: 'Match Issues and Goals',

        initialize: function () {
            Page.prototype.initialize.apply(this, arguments);

            let caseID = this.urlParams['case_id'];

            let goalsActivity = new Goals(caseID);

            this.add(goalsActivity);
        }

    });

});