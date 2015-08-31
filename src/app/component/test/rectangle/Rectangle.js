define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var Handlebars = require('handlebars');
	var template = require('text!component/test/rectangle/Rectangle.html');

	return Component.extend({

		events: {
			'click h3': 'onClick'
		},

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);
			this.interactive = true;

			this.name = 'Rectangle';
		},

		onClick: function () {

			alert('Clicked.');

		},

		render: function () {
			this.$el.html(Handlebars.compile(template)({
				text: 'Rectangle'
			}));
			return this;
		}

	});
});
