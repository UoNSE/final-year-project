define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var Handlebars = require('handlebars');
	var template = require('text!component/test/circle/Circle.html');

	return Component.extend({

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);

			this.name = 'Circle';
		},

		render: function () {
			this.$el.html(Handlebars.compile(template)({
				header: 'Circle',
				content: 'Lorem Ipsum'
			}));
			return this;
		}

	});
});