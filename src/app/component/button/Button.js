define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/button/Button.hbs');

	return Component.extend({
		template: template,
		styles: 'component/button/Button.css'
	});

});
