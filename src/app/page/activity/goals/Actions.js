define(function (require) {
    'use strict';

    var Page = require('core/Page');
    var Actions = require('component/activity/goals/actions/Actions');

    /**
     * Activity extends from the InventoryPage thereby .
     *
     * @class Actions
     */
    return Page.extend({

        name: 'actions',

        initialize: function () {
            Page.prototype.initialize.apply(this, arguments);
            let goalID = this.urlParams['goal_id'];
            this.add(new Actions(goalID));
        }

    });

});