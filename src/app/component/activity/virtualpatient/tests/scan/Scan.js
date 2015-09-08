define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/tests/scan/Scan.hbs');

	return Component.extend({
		template: template,
		classes: 'scan',
		styles: 'component/activity/virtualpatient/tests/scan/Scan.css'
	});

});
