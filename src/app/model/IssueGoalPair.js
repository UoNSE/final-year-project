define(function (require) {

    var SerializableModel = require('model/SerializableModel');

    var Issue = require('model/Issue');
    var Goal = require('model/Goal');

    return SerializableModel.extend({

        defaults: {
            issue: null,
            goal: null,
            color: 'default',
            classes: null,
            width: null,
            height: null
        },

        relations: [{
            type: Backbone.HasOne,
            key: 'issue',
            relatedModel: Issue
        }, {
            type: Backbone.HasOne,
            key: 'goal',
            relatedModel: Goal
        }]

    });

});
