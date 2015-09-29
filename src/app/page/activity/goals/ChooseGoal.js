define(function (require) {
    'use strict';

    var Page = require('core/Page');
    var ChooseGoal = require('component/activity/goals/chooseGoal/ChooseGoal');

    /**
     * Activity extends from the InventoryPage thereby .
     *
     * @class ChooseGoal
     */
    return Page.extend({

        name: 'ChooseGoal',

        title: 'Choose a Goal',

        initialize: function () {
            Page.prototype.initialize.apply(this, arguments);
            let caseID = this.urlParams['case_id'];
            let chooseGoalsActivity = new ChooseGoal(caseID);
            this.add(chooseGoalsActivity);
        }

    });

});