define(function (require) {

    'use strict';

    var Component = require('core/Component');
    var template = require('text!component/help/help.hbs');

    return Component.extend({
        detached: true,
        template: template,
        origin: 'top left',
        styles: 'component/help/help.css',

        events: {
            'click .help-btn': 'onHelpClick'
        },

        initialize: function () {
            Component.prototype.initialize.apply(this, arguments);
            $(".help-container").interactive = true;
			this.position.y = -80;
        },

        onHelpClick: function (event) {
            $(".help-container").toggle();
        }

    });

});
