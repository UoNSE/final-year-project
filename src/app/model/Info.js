define(function (require) {

    var _ = require('underscore');
    var Panel = require('model/Panel');

    var Info = Panel.extend({

        defaults: {
            body: 'Info',
            issueid: null,
        }

    });

    _.extend(Info.prototype.defaults, Panel.prototype.defaults);

    return Info;

});
