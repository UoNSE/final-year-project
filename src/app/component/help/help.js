define(function (require) {

    'use strict';

    var Component = require('core/Component');
    var template = require('text!component/actionbutton/ActionButton.hbs');
    var ActionButton = require('model/ActionButton');

    return Component.extend({
        detached: true,
        template: template,

        events: {
            'click': 'onClick'
        },

        initialize: function () {
            Component.prototype.initialize.apply(this, arguments);
            this.model = new ActionButton({
                icon: 'action-help',
                styles: {
                    margin: 10
                }
            });
        },

        onClick: function (event) {
            alert("HELP");
            $(".help-container").toggle();
        }

    });

});
