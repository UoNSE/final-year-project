define(function (require) {

    var Backbone = require('backbone');

    var Info = require('model/Info');

    return Backbone.RelationalModel.extend({

        type: Backbone.HasOne,

        defaults: {
            info: null
        },

        relations: [{
            type: Backbone.HasMany,
            key: 'info',
            relatedModel: Info
        }]

    });

});