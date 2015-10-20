define(function (require) {

    var _ = require('underscore');
    var Panel = require('model/Panel');

    var Help = Panel.extend({});

    _.extend(Help.prototype.defaults, Panel.prototype.defaults, {
        title: 'Help',
        width: 300
    });

    return Help;

});

