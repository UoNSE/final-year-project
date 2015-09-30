define(function (require) {

    'use strict';

    var _ = require('underscore');
    var Component = require('core/Component');
    var template = require('text!component/help/v2/help/help.hbs');
    var ActionButton = require('component/actionbutton/ActionButton');

    /**
     * @class HelpButton
     * @classdesc This is a custom ActionButton for handling
     * hiding and showing the Help Information.
     */
    var HelpButton = ActionButton.extend({
        detached: true,

        events: {
            'click .help-btn': 'help',
            'click .help-close': 'close'
        },

        model: {
            color: 'primary',
            icon: 'action-help',
            classes: 'help-btn'
        },

        initialize: function () {
            Component.prototype.initialize.apply(this, arguments);
        },

        help: function () {
            $('.help-container').show();
            $('.help-btn').hide();
        }

    });


    /**
     * @class Help
     */
    return Component.extend({
        // important for having fixed position near back button
        detached: true,

        events: {
            'click .help-close': 'close'
        },

        template: template,

        styles: 'component/help/v2/help/help.css',

        initialize: function () {
            Component.prototype.initialize.apply(this, arguments);
            this.helpButton = this.add(new HelpButton());
        },

        close: function () {
            $('.help-btn').show();
            $('.help-container').hide();
        }

    });

});


