define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Information = require('component/cases/case/information/Information');

	return Page.extend({
		name: 'information',
		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);
			this.add(new Information());
		}
	});
});
