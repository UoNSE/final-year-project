define(function (require) {

    'use strict';

    var $ = require('jquery');

    var ViewController = require('controller/ViewController');

    var template = require('text!component/inventory/InventoryView.html');

    return ViewController.extend({

        styles: 'inventory.css',

        template: template,

        events: {
        },

        onBeforeRender: function () {
        },

        onStart: function (event) {
        }

    });

});
