define(function (require) {

    //var Backbone = require('backbone');
    var _ = require('underscore');
    var Panel = require('model/Panel');

    var CaseInfo = Panel.extend({

        defaults: {
            name: 'CaseInfo'
        }

    });

    _.extend(CaseInfo.prototype.defaults, Panel.prototype.defaults);

    return CaseInfo;

});
