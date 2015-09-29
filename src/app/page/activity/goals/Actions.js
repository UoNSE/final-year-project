define(function (require) {
    'use strict';

    var InventoryPage = require('page/InventoryPage');
    var Actions = require('component/activity/goals/actions/Actions');

    /**
     * Activity extends from the InventoryPage thereby .
     *
     * @class Actions
     */
    return InventoryPage.extend({

        name: 'actions',

        initialize: function () {
            InventoryPage.prototype.initialize.apply(this, arguments);
            let goalID = this.urlParams['goal_id'];
            this.add(new Actions(goalID));
        }

    });

});