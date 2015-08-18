define(function (require) {

    var Backbone = require('backbone');

    return Backbone.Model.extend({

        defaults: {
            content: "This is an action",
            goalId: 1
        },

        isValid: function (content) {
            return $.trim(content);
        }

    });

});