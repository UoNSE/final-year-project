define(function (require) {
    'use strict';

    var InventoryPage = require('page/InventoryPage');
    var ChooseGoal = require('component/activity/goals/chooseGoal/ChooseGoal');

    /**
     * Activity extends from the InventoryPage thereby .
     *
     * @class ChooseGoal
     */
    return InventoryPage.extend({

        name: 'ChooseGoal',

        title: 'Choose a Goal',

        initialize: function () {
            InventoryPage.prototype.initialize.apply(this, arguments);
            let caseID = this.urlParams['case_id'];
            let chooseGoalsActivity = new ChooseGoal(caseID);
            this.add(chooseGoalsActivity);
        }

    });

});