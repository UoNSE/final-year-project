define(function (require) {
	'use strict';

	var Object2D = require('core/Object2D');
	var Overview = require('component/overview/Overview');

	return Object2D.extend({
		name: 'overview',
		initialize: function () {
			Object2D.prototype.initialize.apply(this, arguments);

			this.add(new Overview());
			//Animate.scale($(this.selector), {duration: 1000});
			//Animate.scale($('#btn-case-overview'), {
			//	css: {fontSize: 20},
			//	delay: 500,
			//	duration: 1000
			//});
		}
	});
});

