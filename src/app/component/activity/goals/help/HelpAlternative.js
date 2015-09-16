define(function (require) {

    'use strict';

    var Component = require('core/Component');
    var template = require('text!component/help/help.hbs');
    var ActionButton = require('component/actionButton/Actionbutton');
    var Object2D = require('core/Object2D');

    /**
     * @class HelpButton
     * @classdesc This is a custom ActionButton for handling
     * hiding and showing the Help Information.
     */
    var HelpButton = ActionButton.extend({
        detached: true,

        events: {
            'click': 'handle'
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
        handle: function (event) {
            event.preventDefault();
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
        helpButton: null,
        styles: 'component/help/help.css',

        initialize: function () {
            Component.prototype.initialize.apply(this, arguments);
            // add the help button as a child; so that we manage both
            // components from the same module
            this.helpButton = this.add(new HelpButton());

            // here we take the template and perform a calculation
            // based on the number of characters we need to accommodate
            // in the panel body; then re-adjust the model.height accordingly
            (function (template) {
                if (template && this.model) {
                    let templateLength = this.template.length;
                    let width = this.model.get('width');
                    this.model.set(
                        'height',
                        this.determineCardHeight(width, templateLength)
                    );
                }
            }.bind(this)(this.template));

        },

        /**
         * TODO: actually make this more robust; accounting for
         * characters made up by html tags (do not factor in
         * actual content length).
         *
         * Determines the appropriate card height, based on
         * the length of the content body.
         *
         * @param length the number of characters in the
         * body of the card.
         * @returns {number} the optimal card height.
         */
        determineCardHeight: function (length) {
            let optimalHeight = 100;
            const scale = length / (100 * 3.5);
            if (length > 50) {
                return optimalHeight = optimalHeight * scale;
            }
            return optimalHeight;
        }

    });

});


