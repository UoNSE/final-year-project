define(function (require) {

    var Backbone = require('backbone');
    var $ = require('jquery');

    return Backbone.Model.extend({

        defaults: {
            content: 'This is a Goal',
            issueId: "0",
            actions: [1]
        }

    });

});
