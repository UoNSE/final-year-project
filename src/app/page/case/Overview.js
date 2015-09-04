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
					id: this.urlParams.id
				}
			}).then(function (cases) {
				var theCase = cases[0];

				this.add(new Overview({
					model: theCase
				}));
			}.bind(this));

		}
	});
});
