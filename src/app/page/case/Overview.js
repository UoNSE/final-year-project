define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Overview = require('component/overview/Overview');

	return Page.extend({
		name: 'overview',
		title: 'Case Overview',
		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);
			let currentCase = this.session.get('case') || {};
			let overview = currentCase.overview || new Timeline();
			this.add(new Overview(overview, this.urlParams));
		}

	});
});
