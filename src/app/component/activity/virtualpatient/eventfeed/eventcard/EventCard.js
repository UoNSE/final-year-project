define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/eventfeed/eventcard/EventCard.hbs');

	return Component.extend({
		template: template,
		classes: 'event-card',
		styles: 'component/activity/virtualpatient/eventfeed/eventcard/EventCard.css',

        initialize: function (appearSchedule) {
            Component.prototype.initialize.apply(this, arguments);

            this.appearSchedule = appearSchedule;
            this.class = "observation"; // or speech

        }
	});

});
