define(function (require) {

    var Backbone = require('backbone');

    var SelectableText = require('model/SelectableText');

    return Backbone.RelationalModel.extend({

        defaults: {
            title: 'CaseInfoCard',
            items:null,
        },

        relations: [{
            type: Backbone.HasMany,
            key: 'items',
            relatedModel: SelectableText
        }]

    });

});
