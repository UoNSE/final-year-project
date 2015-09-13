define(function (require) {

    var Backbone = require('backbone');

    return Backbone.Model.extend({

        defaults: {
            data: 'This is a topic',
            topicId: 0
        }

    });

});
