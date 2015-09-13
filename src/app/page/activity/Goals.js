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
        initialize: function () {
            InventoryPage.prototype.initialize.apply(this, arguments);
            this.add(new Goals());
        }
    });

});