define(function (require) {

    var Backbone = require('backbone');

    return Backbone.Model.extend({

        defaults: {
            content: 'This is a Goal'
        }

    });

});
