define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Cases = require('component/cases/Cases');

	return Page.extend({
		name: 'cases',
		initialize: function () {
			Page.prototype.initialize.call(this);

			this.add(new Cases());
		}
	});
});

