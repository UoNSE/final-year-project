define(function (require) {
	'use strict';

	var Object2D = require('core/Object2D');
	var Information = require('component/cases/case/information/Information');

	return Object2D.extend({
		name: 'information',
		initialize: function () {
			Object2D.prototype.initialize.apply(this, arguments);
			this.add(new Information());
		}
	});
});
