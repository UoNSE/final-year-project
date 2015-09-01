define(function (require) {
	'use strict';

	var Object2D = require('core/Object2D');
	var Circle = require('component/test/circle/Circle');
	var Rectangle = require('component/test/rectangle/Rectangle');

	return Object2D.extend({
		initialize: function () {
			Object2D.prototype.initialize.call(this);

			this.name = 'menu';

			var m = 3;
			for (var j = 0; j < m; j++) {
				var circle = new Circle();
				circle.interactive = true;
				circle.position.setPolar(200, j / m * Math.TAU);
				//circle.rotation = -Math.TAU / 8;
				//circle.rotation = -Math.TAU / 6;
				circle.scale.set(0.5, 0.5);
				this.add(circle);

				new TWEEN.Tween(circle).to({
					rotation: circle.rotation - Math.TAU * (2 * (j % 2) - 1)
				}, 25000).repeat(Infinity).start();

				//new TWEEN.Tween({
				//	circle: circle,
				//	r: 200,
				//	theta: j / m * Math.TAU
				//}).to({
				//	theta: j / m * Math.TAU + Math.TAU
				//}, 100000).onUpdate(function () {
				//	this.circle.position.setPolar(this.r, this.theta);
				//}).repeat(Infinity).start();

				var n = 8;
				var r = 130;
				for (var i = 0; i < n; i++) {
					var theta = i * Math.TAU / n;
					var rectangle = new Rectangle();
					rectangle.draggable = true;
					rectangle.droppable = true;
					rectangle.position.setPolar(r, theta);
					rectangle.rotation = i / n * Math.TAU + Math.TAU / 4;
					//rectangle.scale.set(0.5, 0.5);

					//new TWEEN.Tween(rectangle).to({rotation: rectangle.rotation + Math.TAU}, 8000).repeat(Infinity).start();
					rectangle.on({
						drag: function (event) {
							event.draggable.$el.css('opacity', 0.5);
						},
						draghover: function (event) {
							event.draggable.$el.css('opacity', 0.8);
						},
						dragend: function (event) {
							event.draggable.$el.css('opacity', 1);
						},
						drop: function (event) {
							console.log('drop');
						}
					});

					circle.add(rectangle);
				}
			}
		}
	});
});

