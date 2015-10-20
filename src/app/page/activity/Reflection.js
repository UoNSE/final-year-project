define(function (require) {
	'use strict';

	let Page = require('core/Page');
	let Reflection = require('component/activity/reflection/Reflection');

	return Page.extend({
		name: 'reflection',
		title: 'Reflection',
		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);
			this.add(new Reflection());
		}
	});
});
