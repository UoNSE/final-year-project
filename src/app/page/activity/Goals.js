define(function (require) {
    'use strict';

    var InventoryPage = require('page/InventoryPage');
    var Goals = require('component/activity/goals/Goals');

    /**
     * Activity extends from the InventoryPage thereby .
     *
     * @class Goals
     */
    return InventoryPage.extend({

        name: 'goals',

        title: 'Match Issues and Goals',

        initialize: function () {
            InventoryPage.prototype.initialize.apply(this, arguments);
            let caseID = this.urlParams['case_id'];
            let goalsActivity = new Goals(caseID);
            this.add(goalsActivity);
        }

    });

});