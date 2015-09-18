define(function (require) {

    var _ = require('underscore');
    var Panel = require('model/Panel');

    var Timer = Panel.extend({
        defaults: {
            'id':'activity-clock',
            'title': 'TimePanel',
            'body': '00:00:00',
            'color': 'success',
            'update-period' : 1000,
            'low': 300000,
            'mid' : 600000,
        }
    });

    _.extend(Timer.prototype.defaults, Panel.prototype.defaults);

    return Timer;

});
