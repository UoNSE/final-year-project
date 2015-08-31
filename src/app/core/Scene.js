define(function (require) {
	'use strict';

	var Object2D = require('core/Object2D');
	var TWEEN = require('tweenjs');
	var $ = require('jquery');

	return Object2D.extend({
		el: '#content',

		initialize: function () {
			Object2D.prototype.initialize.apply(this, arguments);
			this.animate();
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
		},

		animate: function (time) {
			requestAnimationFrame(this.animate.bind(this));
			TWEEN.update(time);
		}
	});
});

