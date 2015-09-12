define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Start = require('component/start/Start');
	var TWEEN = require('tweenjs');

	var Vector2 = require('math/Vector2');

	return Page.extend({
		name: 'start',
		back: false,

		initialize: function () {
			Page.prototype.initialize.call(this);
			this.start = this.add(new Start());

			//this.start.opacity = 0;
			this.start.scale.set(0, 0);

		},

		onPageEnter: function () {
			return new TWEEN.Tween(this.start.scale).to(Vector2.ones()).easing(TWEEN.Easing.Elastic.Out);
			//var start = this.start;
			//return new TWEEN.Tween({value: 0}).to({value: 1}, 600)
			//	.onUpdate(function () {
			//		start.scale.set(this.value, this.value);
			//		start.opacity = this.value;
			//	}).easing(TWEEN.Easing.Back.Out);
		},

		onPageLeave: function () {
			return new TWEEN.Tween(this.start.scale).to(Vector2.zeros()).easing(TWEEN.Easing.Elastic.In);
		}

	});
});

