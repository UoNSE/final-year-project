define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/chart/Chart.hbs');

	return Component.extend({
		template: template,
		classes: 'chart',
		styles: 'component/activity/virtualpatient/tests/patient/Chart.css'

	});

});
