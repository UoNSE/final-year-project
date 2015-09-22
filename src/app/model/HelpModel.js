define(function (require) {

    var _ = require('underscore');
    var Panel = require('model/Panel');

    var HelpModel = Panel.extend({

        defaults: {
            helpContent: ''
        }

    });

    _.extend(HelpModel.prototype.defaults, Panel.prototype.defaults);

    return HelpModel;

});

