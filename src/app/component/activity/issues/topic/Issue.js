define(function (require) {
    'use strict';

    var ActionButton = require('component/actionbutton/ActionButton');
    var ActionButtonModel = require('model/ActionButton');

    return ActionButton.extend({
        topicId: null,

        initialize: function (params) {
            ActionButton.prototype.initialize.apply(this, arguments);
            this.topicId = params.topicId;

            this.model = new ActionButtonModel({
                text: params.name,
                color: 'blue',
                classes: 'Issue',
                styles: {
                    width: 150,
                    height: 150
                }
            });
        },

        onClick: function(event){

        }
    });
});