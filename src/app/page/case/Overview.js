define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Overview = require('component/overview/Overview');
	var Cases = require('collection/Cases');

	return Page.extend({
		name: 'overview',
		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);

			new Cases().fetch({
				data: {
					id: this.urlParams['case_id']
				}
			}).then(function (cases) {
				this.add(new Overview({
					model: cases[0]
				}));
			}.bind(this));

		}
	});
});
