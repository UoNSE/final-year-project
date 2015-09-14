define(function (require) {

    var Backbone = require('backbone');

    return Backbone.RelationalModel.extend({

        defaults: {
            text: 'CaseInfoCardText',
            index: null
        }

    });

});
