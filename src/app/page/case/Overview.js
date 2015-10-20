define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Overview = require('component/overview/Overview');
	var Timeline = require('component/timeline/Timeline');

	return Page.extend({
		name: 'overview',
		title: 'Case Overview',
		showHomeButton: false,
		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);
			let currentCase = this.session.get('case') || {};
			let overview = currentCase.overview || new Timeline();
			this.add(new Overview(overview, this.urlParams));
			this.backButton.position.x = 0;
		}

	});
});
