define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Start = require('component/start/Start');

	return Page.extend({
		name: 'start',
		initialize: function () {
			Page.prototype.initialize.call(this);

			var start = new Start();
			this.add(start);
		}
	});
});

