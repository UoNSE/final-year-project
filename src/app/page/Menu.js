define(function (require) {

	'use strict';

	var Object2D = require('Object2D');
	var $ = require('jquery');
	var TWEEN = require('tweenjs');

	var Circle = require('component/test/circle/CircleController');
	var Rectangle = require('component/test/rectangle/RectangleController');

	return Object2D.extend({
		el: '#content',

		initialize: function () {
			Object2D.prototype.initialize.call(this);

			this.name = 'menu';

			var m = 5;
			for (var j = 0; j < m; j++) {
				var circle = new Circle();
				//circle.position.set(300, 400);
				//circle.rotation = -Math.TAU / 8;
				circle.scale.set(0.85, 0.85);
				this.add(circle);

				new TWEEN.Tween(circle).to({
					rotation: circle.rotation - Math.TAU * (2 * (j % 2) - 1)
				}, 4000).onUpdate(function () {
					this.moveToPosition();
				}).repeat(Infinity).start();

				new TWEEN.Tween({
					circle: circle,
					r: 250,
					theta: j / m * Math.TAU
				}).to({
					theta: j / m * Math.TAU + Math.TAU
				}, 10000).onUpdate(function () {
					this.circle.position.setPolar(this.r, this.theta);
					this.circle.moveToPosition();
				}).repeat(Infinity).start();

				var n = 14;
				var r = 130;
				for (var i = 0; i < n; i++) {
					var theta = i * Math.TAU / n;
					var rectangle = new Rectangle();
					rectangle.position.setPolar(r, theta);
					rectangle.rotation = i / n * Math.TAU + Math.TAU / 4;
					rectangle.scale.set(0.5, 0.5);

					new TWEEN.Tween(rectangle).to({rotation: rectangle.rotation + Math.TAU}, 8000).onUpdate(function () {
						this.moveToPosition();
					}).repeat(Infinity).start();

					circle.add(rectangle);
				}
			}
			this.animate();
		},

		animate: function (time) {
			requestAnimationFrame(this.animate.bind(this));
			TWEEN.update(time);
		},

		render: function () {
			this.children.forEach(function (child) {
				this.renderObject(child, this.$el);
			}, this);

			return this;
		},

		renderObject: function (object, $el) {
			var childEl = $(object.render().el);
			childEl.attr('id', object.id);
			object.moveToPosition();
			var container = $el.children('.component-children');
			if (container.length === 0) {
				container = $('<div>', {'class': 'component-children'});
				$el.append(container);
			}
			container.append(childEl);
			object.children.forEach(function (child) {
				this.renderObject(child, childEl);
			}, this);
		}
	});

});

