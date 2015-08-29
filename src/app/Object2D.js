define(function (require) {

	'use strict';

	var Backbone = require('backbone');

	var Vector2 = require('math/Vector2');
	var MathUtil = require('math/MathUtil');

	var Object2D = Backbone.View.extend({
		tagName: 'section',
		initialize: function () {
			this.id = 'component-' + MathUtil.generateUUID(8);
			this.name = '';
			this.position = new Vector2(0, 0);
			this.scale = new Vector2(1, 1);
			this.rotation = 0;

			this.parent = null;
			this.children = [];
		},
		moveToPosition: function () {
			this.$el.css({
				'transform': 'translate(calc(-50% + ' + this.position.x + 'px), calc(-50% + ' + this.position.y + 'px))'
					+ ' rotateZ(' + (this.rotation / Math.TAU) + 'turn)'
					+ ' scale(' + this.scale.x + ', ' + this.scale.y + ')'
			});
		},
		add: function (child) {
			if (!(child instanceof Object2D)) {
				throw new Error('Object2D: Cannot add child which is not of type Object2D');
			}
			child.parent = this;
			this.children.push(child);
		}
	});

	return Object2D;

});

