define(function (require) {

    var SerializableModel = require('model/SerializableModel');

    return SerializableModel.extend({

        defaults: {
            data: 'This is a topic',
            topicId: 0
        }

    });

});
