define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/test/rectangle/Rectangle.hbs');

	return Component.extend({

		name: 'Rectangle',
		template: template,
		interactive: true,

		events: {
			'click h3': 'onClick'
		},

		onClick: function () {

			alert('Clicked.');

		}

	});
});
