define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/tests/Tests.hbs');

	return Component.extend({
		template: template,
		classes: 'tests',
		styles: 'component/activity/virtualpatient/tests/Tests.css'
	});

});
