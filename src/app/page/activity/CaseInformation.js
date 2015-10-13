define(function (require) {
    'use strict';

    var InventoryPage = require('page/InventoryPage');
    var CaseInformation = require('component/activity/casebackground/Issues');

    return InventoryPage.extend({
        name: 'caseinfo',
        title: 'Case Information',
        counter: 0, //counter for hidden items

        initialize: function () {
            InventoryPage.prototype.initialize.apply(this, arguments);
            this.add(new CaseInformation(this.inventory, this.urlParams));
        }
    });
});