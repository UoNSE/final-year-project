define(function (require) {

    'use strict';

    var $ = require('jquery');

    var ViewController = require('controller/ViewController');

    return ViewController.extend({

        styles: 'inventory.css',

        events: {
            'click #inventory-toggle' : 'toggleInventory'
        },

        onBeforeRender: function () {
        },

        toggleInventory : function () {
            var inv = $('.inventory');
            var width = inv.css('width');
            if (parseInt(inv.css('right'))<0) {
                inv.animate({right: '+='+width}, 1000,function(){
                    $('#inventory-toggle').html('<i class="mdi-hardware-keyboard-arrow-right">');
                });
            } else {
                inv.animate({right: '-='+width}, 1000, function(){
                    $('#inventory-toggle').html('<i class="mdi-hardware-keyboard-arrow-left">');
                });
            }
        }

    });

});