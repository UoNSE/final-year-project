define(function (require) {

	'use strict';

	var Backbone = require('backbone');
	var Vector2 = require('math/Vector2');

	var Object2D = Backbone.View.extend({
		initialize: function () {
			this.name = '';
			this.position = new Vector2(0, 0);
			this.scale = new Vector2(1, 1);
			this.rotation = 0;

			this.worldPosition = new Vector2(0, 0);
			this.worldScale = new Vector2(1, 1);
			this.worldRotation = 0;
			this.needsWorldUpdate = true;

			this.parent = null;
			this.children = [];
		},
		updateWorld: function () {
			if (!this.needsWorldUpdate) {
				return;
			}

			var parent = this.parent;
			if (parent) {
				parent.updateWorld();
				var ca = Math.cos(parent.worldRotation);
				var sa = Math.sin(parent.worldRotation);
				var tx = this.position.x;
				var ty = this.position.y;
				var sx = parent.scale.x;
				var sy = parent.scale.y;
				this.worldPosition.set(sx * (ca * tx - sa * ty) + parent.worldPosition.x, sy * (sa * tx + ca * ty) + parent.worldPosition.y);
				this.worldRotation = this.rotation + parent.worldRotation;
				this.worldScale.multiplyVectors(this.scale, parent.worldScale);
			} else {
				this.worldPosition.copy(this.position);
				this.worldRotation = this.rotation;
				this.worldScale.copy(this.scale);
			}
			this.needsWorldUpdate = false;
		},
		moveToPosition: function () {
			this.$el.css({
				'position': 'absolute',
				'left': 0,
				'top': 0,
				'transform': 'translate(' + this.worldPosition.x + 'px, ' + this.worldPosition.y + 'px)'
					+ ' rotateZ(' + this.worldRotation + 'rad)'
					+ ' scale(' + this.worldScale.x + ', ' + this.worldScale.y + ')'
			});
		},
		add: function (child) {
			if (!(child instanceof Object2D)) {
				throw new Error('Object2D: Cannot add child which is not of type Object2D');
			}
			child.parent = this;
			child.needsWorldUpdate = true;
			this.children.push(child);
		}
	});

	return Object2D;

});

