define(function (require) {

    var Backbone = require('backbone');

    var Issue = require('model/Issue');
    var Goal = require('model/Goal');

    return Backbone.RelationalModel.extend({

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
            type: Backbone.HasMany,
            key: 'goal',
            relatedModel: Goal
        }]

    });

});
