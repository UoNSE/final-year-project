define(function (require) {
    'use strict';

    var Component = require('core/Component');
    var template = require('text!component/timer/Timer.hbs');

    return Component.extend({
        template: template,
        styles: 'component/button/Timer.css',

    });

});/*
define(function (require) {

    'use strict';

    var Panel = require('component/panel/Panel');

    return Panel.extend({

        initialize: function () {
            Panel.prototype.initialize.apply(this, arguments);
            this.interactive = true;
            this.setDraggable();
        }

    });

});
*/