define(function (require) {

    var Backbone = require('backbone');

    var CaseInfoCard = require('model/CaseInfoCard');

    return Backbone.RelationalModel.extend({

        defaults: {
            name: 'CaseInfo',
            timer: '00:00:00',
            cards: null
        },

        relations: [{
            type: Backbone.HasMany,
            key: 'cards',
            relatedModel: CaseInfoCard
        }]

    });

});
