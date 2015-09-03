define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/hint/Hint.hbs');

	return Component.extend({

		template: template,
		styles: ['component/hint/Hint.css']

	});

});
