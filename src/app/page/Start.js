define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Start = require('component/start/Start');

	return Page.extend({
		name: 'start',
		initialize: function () {
			Page.prototype.initialize.call(this);

			this.add(new Start());
		}
	});
});

