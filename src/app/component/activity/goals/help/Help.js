define(function (require) {

    'use strict';

    var _ = require('underscore');
    var Component = require('core/Component');
    var template = require('text!component/activity/goals/help/help.hbs');
    var ActionButton = require('component/actionbutton/ActionButton');
    var Object2D = require('core/Object2D');
    var MathUtil = require('math/MathUtil');

    /**
     * @class HelpButton
     * @classdesc This is a custom ActionButton for handling
     * hiding and showing the Help Information.
     */
    var HelpButton = ActionButton.extend({
        detached: true,

        events: {
            'click .help-btn': 'handle'
        },

        model: {
            color: 'primary',
            icon: 'action-help',
            classes: 'help-btn'
        },

        initialize: function () {
            Component.prototype.initialize.apply(this, arguments);
        },

        /**
         * When the HelpButton is clicked, this method is invoked.
         * Delegates to JQuery and simply toggles the visibility of
         * the help panel.
         */
        handle: function () {
            $('.help-container').toggle();
        }

    });

    /**
     * @class Help
     */
    return Component.extend({
        // important for having fixed position near back button
        detached: true,

        template: template,

        helpButton: {},

        styles: 'component/activity/goals/help/help.css',

        id: '',

        initialize: function () {
            Component.prototype.initialize.apply(this, arguments);
            // add the help button as a child; so that we manage both
            // components from the same module
            this.helpButton = this.add(new HelpButton());
            this.show();
        }

    });

});


