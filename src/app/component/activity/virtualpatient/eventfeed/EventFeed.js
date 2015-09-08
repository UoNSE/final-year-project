define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/eventfeed/EventFeed.hbs');

	return Component.extend({
		template: template,
		classes: 'eventfeed',
		styles: 'component/activity/virtualpatient/tests/patient/EventFeed.css'

	});

});
