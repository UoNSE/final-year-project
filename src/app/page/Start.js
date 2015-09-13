define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Start = require('component/start/Start');
	var TWEEN = require('tweenjs');

	var Vector2 = require('math/Vector2');

	return Page.extend({
		name: 'start',
		title: 'Start',
		back: false,

		initialize: function () {
			Page.prototype.initialize.call(this);
			this.add(new Start());
		}
	});
});

