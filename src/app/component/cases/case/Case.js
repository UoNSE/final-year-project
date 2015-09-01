define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/cases/case/Case.hbs');

	return Component.extend({
		template: template
	});
});
