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
                $('#inventory-toggle').css('box-shadow', 'none').animate({
                    left: '+=40px'
                },1000,function() {
                    $('#inventory-toggle').css({
                        'padding': '0px 12px 0px 0px', 'height': '24px',
                        'top': '0px'
                    });
                });
                inv.animate({right: '+='+width}, 1000,function(){
                    $('#inventory-toggle').addClass("mdi-hardware-keyboard-arrow-right").removeClass("mdi-hardware-keyboard-arrow-left");
                });
            } else {
                $('#inventory-toggle').css({
                    'padding': '10px 8px 6px 2px',
                    'height': '44px',
                    'top':'-10px'
                }).animate({
                    left: '-=40px'
                },1000,function() {
                    $('#inventory-toggle').css({
                        'box-shadow': '-3px 1px 6px 0 rgba(0,0,0,0.12)'
                    });
                });

                inv.animate({right: '-='+width}, 1000, function(){
                    $('#inventory-toggle').addClass("mdi-hardware-keyboard-arrow-left").removeClass("mdi-hardware-keyboard-arrow-right");
                });
            }
        }

    });

});
