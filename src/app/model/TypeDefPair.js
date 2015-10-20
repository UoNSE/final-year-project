define(function (require) {

    var Backbone = require('backbone');

    var Type = require('model/Type');
    var Definition = require('model/Definition');

    return Backbone.RelationalModel.extend({

        defaults: {
            type: null,
            definition: null,
            color: 'default',
            classes: null,
            width: null,
            height: null
        },

        relations: [{
            type: Backbone.HasOne,
            key: 'type',
            relatedModel: Type
        }, {
            type: Backbone.HasOne,
            key: 'definition',
            relatedModel: Definition
        }]

    });

});
