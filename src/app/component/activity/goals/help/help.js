define(function (require) {

    'use strict';

    var Component = require('core/Component');
    var template = require('text!component/help/help.hbs');
    var ActionButton = require('component/actionButton/Actionbudtton');

    return Component.extend({
        detached: true,
        template: template,
        styles: 'component/help/help.css',

        events: {
            'click .help-btn': 'onHelpClick'
        },

        initialize: function () {
            Component.prototype.initialize.apply(this, arguments);
            $(".help-container").interactive = true;
        },

        onHelpClick: function (event) {
            $(".help-container").toggle();
        }

    });

});
