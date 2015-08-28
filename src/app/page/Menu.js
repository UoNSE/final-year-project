define(function (require) {

	'use strict';

	var Object2D = require('Object2D');

	var Circle = require('component/test/circle/CircleController');
	var Rectangle = require('component/test/rectangle/RectangleController');

	return Object2D.extend({
		el: '#content',

		initialize: function () {
			Object2D.prototype.initialize.call(this);

			this.name = 'menu';

			var circle = new Circle();
			circle.position.set(300, 400);
			circle.rotation = -Math.PI / 8 ;
			circle.scale.set(2, 2);
			this.add(circle);

			var rectangle = new Rectangle();
			rectangle.position.set(200, 0);
			rectangle.rotation = Math.PI / 4;
			rectangle.scale.set(1, 1);
			circle.add(rectangle);
		},

		render: function () {
			this.children.forEach(function (child) {
				this.renderObject(child);
			}, this);

			return this;
		},

		renderObject: function (object) {
			var el = this.$el;
			var childEl = object.render().el;
			object.updateWorld();
			object.moveToPosition();
			el.append(childEl);
			object.children.forEach(function (child) {
				this.renderObject(child);
			}, this);
		}
	});

});

