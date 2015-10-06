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
     *
     * @classdesc A component that provides a detached panel and associated buttons,
     * which float to the top LHS of the screen. Help can be used to provide the user
     * a list of instructions to follow.
     *
     * @example
     * let Help = require('component/help/v2/help/Help');
     * // include html, such as an unordered list, in an external handlebars file
     * let HelpText = require('text!component/activity/goals/help/helpContent.hbs');
     *
     * return Component.extend({
     *
     *  // in your initialize function
     *  initialize: function () {
     *      Component.prototype.initialize.apply(this, arguments);
     *
     *      // add help component to the page
     *       this.help = this.add(new Help({
     *           model: new HelpModel({
     *               title: 'Help',
     *               width: 300,
     *               helpContent: HelpText
     *           })
     *       }));
     *  },
     *
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


