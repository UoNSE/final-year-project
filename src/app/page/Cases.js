define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Cases = require('component/cases/Cases');
	var Promise = require('bluebird');

	return Page.extend({
		name: 'cases',
		title: 'Cases',
		showHomeButton: false,

		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);
			this.cases = this.add(new Cases());
			this.backButton.position.x = 0;
		},

		onPageEnter: function () {
			return Promise.resolve();
		}
	});
});

