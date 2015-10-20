define(function (require) {
    'use strict';
    var Component = require('core/Component');
    var template = require('text!component/statuscart/StatusCart.hbs');
    var ActionButton = require('component/actionbutton/ActionButton');
    var Button = require('component/button/Button');

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

    var Panel = Component.extend({ //this is the same as help - should we resue? no, they have different classs //panel extends component
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
            this.position.x = -0;
            this.position.y = -80;
        },

        close: function () {
            this.hide();
        }

    });

//---------------------------------------------------------@todo remove/ modify this:
// this is neccesary for: newStatusCart(...) to fire - possibly because we're using the _.extend call in the model..
    /**
     * @class StatusCartButton
     * @classdesc This is a custom ActionButton for handling
     * hiding and showing the StatusCart Information.
     */
    return Button.extend({ //-------------------the actionbutton might refer to the parent one that hides the
        detached: true,
        origin: 'top right',
        pageOrigin: 'top right',

        //* //modify the got it button, but keep the extend?
        initialize: function (model) { //This is initialising the button parent???
            this.model = {
                color: 'primary',
                icon: 'action-help',
                classes: 'help-btn'
            };
            ActionButton.prototype.initialize.apply(this, arguments);
            this.panel = this.add(new Panel({model: model}));
            //this.position.set(10, -80);
            //this.panel.alwaysOnTop = true;
        }
    });

    /*
    return ActionButton.extend({
        detached: true,
        origin: 'top left',
		pageOrigin: 'top left',

        //* //modify the got it button, but keep the extend?
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
    //*/
// --------------------------------------------------------- end todo
});


