define(function (require) {

	'use strict';

	var ActionButton = require('component/actionbutton/ActionButton');
	var Card = require('component/activity/issues/card/Card');

	return ActionButton.extend({

		initialize: function () {
			ActionButton.prototype.initialize.apply(this, arguments);
			this.setDroppable({
				types: Card
			});
			this.active = false;
			this.originalModel = this.model.clone();
			this.bindEvents();
		},

		bindEvents: function () {
			var multiTouchElement = this.getMultiTouchElement();
			multiTouchElement.component.on({
				mouseenter: this.onEnter.bind(this),
				mouseleave: this.onLeave.bind(this),
				touchenter: this.onEnter.bind(this),
				touchleave: this.onLeave.bind(this)
			});
		},

		isActive: function () {
			return this.active;
		},

		onEnter: function (event) {
			this.active = true;
			this.$el.find('button').addClass('btn-material-amber');
			//this.model.set('color', 'amber');
		},

		onLeave: function (event) {
			this.active = false;
			this.$el.find('button').removeClass('btn-material-amber');
			//this.model.set('color', this.originalModel.get('color'));
		}

	});

});
