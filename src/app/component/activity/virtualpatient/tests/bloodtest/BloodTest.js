define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/tests/bloodtest/BloodTest.hbs');

	return Component.extend({
		template: template,
		classes: 'blood-test',
		styles: 'component/activity/virtualpatient/tests/bloodtest/BloodTest.css'
	});

});
