define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Cases = require('component/cases/Cases');
	var Promise = require('bluebird');

	return Page.extend({
		name: 'cases',
		title: 'Cases',

		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);
			this.cases = this.add(new Cases());
		},

		onPageEnter: function () {
			return Promise.resolve();
		}
	});
});

