define(function (require) {

    var Backbone = require('backbone');
    var $ = require('jquery');

    return Backbone.Model.extend({

        defaults: {
            content: 'This is a Goal'
        },

        isValid: function () {
            return $.trim(this.get('content'));
        }

    });

});
