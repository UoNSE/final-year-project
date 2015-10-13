define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/sprite/rectangle/Rectangle.hbs');

	return Component.extend({
		template: template
	});

});
