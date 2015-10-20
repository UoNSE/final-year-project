define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Start = require('component/start/Start');

	var Vector2 = require('math/Vector2');

	return Page.extend({
		name: 'startpage',
		title: 'Start',
		showHomeButton: false,
		showBackButton: false,
		showAssistanceButton: false,

		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);
			this.add(new Start());
		}

	});
});
