define(function (require) {
    'use strict';
    var Component = require('core/Component');
    var template = require('text!component/help/Help.hbs');
    var ActionButton = require('component/actionbutton/ActionButton');

    /**
     * @class StatusCart
     *
     * @classdesc A compomenent that displays a user 'status bar' simmilar to help
     * Will float on RHS of Screen (for virtual patient at least)
     *
     *
     * @example
     * see help compoenent for simmilar usage
     *
     */

    var Panel = Component.extend({
        // important for having fixed position near back button
        template: template,
		classes: 'cpn-sb', //unsure what classes refers to - its css classes - you need to link the js-generated component to the css somehow
		styles: 'component/statuscart/StatusCart.css',
        origin: 'top right',
        //events: { //we will apply a click behavior once its enabled to students may progress to the next module
        //    'click .confirm': 'close'
        //},

        initialize: function () {
            Component.prototype.initialize.apply(this, arguments);
            this.position.x = 800;
        },

        close: function () {
            this.hide();
        }

    });


    /**
     * @class HelpButton
     * @classdesc This is a custom ActionButton for handling
     * hiding and showing the Help Information.
     */
    /*
    return ActionButton.extend({
        detached: true,
        origin: 'top left',
		pageOrigin: 'top left',

        initialize: function (model) {
            this.model = {
                color: 'primary',
				icon: 'action-help',
				classes: 'help-btn'
            };
            ActionButton.prototype.initialize.apply(this, arguments);
            this.position.set(10, -80);
            this.panel = this.add(new Panel({model: model}));
            this.panel.alwaysOnTop = true;
        },

        onClick: function (event) {
            let panel = this.panel;
            panel.toggle();
        }

    });
    */
});


