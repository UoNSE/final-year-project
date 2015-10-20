define(function (require) {
    'use strict';

    let Page = require('core/Page');
    let CaseInformation = require('component/activity/casebackground/backgroundinfo/CaseBackground');

    let InventoryModel = require('model/Inventory');
    let Inventory = require('component/inventory/Inventory');

    return Page.extend({
        name: 'case-information-2',
        title: 'Case Information',

        initialize: function () {
            Page.prototype.initialize.apply(this, arguments);
            this.add(new CaseInformation(this.urlParams['case_id'], this.urlParams['round_id']));
        }
    });
});