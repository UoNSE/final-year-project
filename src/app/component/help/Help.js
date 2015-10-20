define(function (require) {

    'use strict';

    var Component = require('core/Component');
    var template = require('text!component/help/Help.hbs');
    var ActionButton = require('component/actionbutton/ActionButton');

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
    let Panel = Component.extend({
        // important for having fixed position near back button
        template: template,
		classes: 'cpn-help',
        origin: 'top left',
        events: {
            'click .confirm': 'close'
        },

        initialize: function () {
            Component.prototype.initialize.apply(this, arguments);
            this.position.x = 80;
        },

        close: function () {
            this.hide();
            this.trigger('close');
        }

    });

    /**
     * @class HelpButton
     * @classdesc This is a custom ActionButton for handling
     * hiding and showing the Help Information.
     */
    let Button = ActionButton.extend({

        origin: 'top left',

        model: {
			color: 'primary',
            base: 'primary',
            active: 'success',
			icon: 'action-help'
		},

        initialize: function () {
            ActionButton.prototype.initialize.apply(this, arguments);
            this.model = new Backbone.Model(this.model);
            this.position.set(10, -10);
        },

        toggle: function (active) {
            let model = this.model;
            let color = active ? model.get('active') : model.get('base');
            this.model.set('color', color);
        }

    });

    return Component.extend({
        detached: true,
        origin: 'top left',
        pageOrigin: 'top left',

        initialize: function () {
            Component.prototype.initialize.apply(this, arguments);
            this.button = this.add(new Button());
            this.button.toggle(true);

            this.panel = this.button.add(new Panel({model: this.model}));
            this.panel.alwaysOnTop = true;

            this.listenTo(this.button, 'click', this.onClick.bind(this));
            this.listenTo(this.panel, 'close', this.onClose.bind(this));
        },

        onClick: function (event) {
            let panel = this.panel;
            panel.toggle();
            this.button.toggle(panel.visible);
        },

        onClose: function (event) {
            this.button.toggle(false);
        }

    });

});


