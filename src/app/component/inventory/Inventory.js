define(function (require) {
    'use strict';

    var Component = require('core/Component');
    var template = require('text!component/inventory/Inventory.hbs');
    var Inventory = require('model/Inventory');

    var Issue = require('model/Issue');
    var Evidence = require('model/Evidence');

    return Component.extend({

        template: template,
        model: new Inventory(),
        styles: 'component/inventory/Inventory.css',
        classes: 'cpn-inventory',
        detached: true,
        width: 400,
        height: '100%',

        initialize: function () {
            Component.prototype.initialize.apply(this, arguments);
        }

    });

});
