define(function (require) {

	'use strict';

	var ActionButton = require('component/actionbutton/ActionButton');

	return ActionButton.extend({

		initialize: function () {
			ActionButton.prototype.initialize.apply(this, arguments);
			this.originalModel = this.model.clone();
			this.bindEvents();
		},

		bindEvents: function () {
			var multiTouchElement = this.getMultiTouchElement();
			multiTouchElement.component.on({
				mouseenter: this.onEnter.bind(this),
				mouseleave: this.onLeave.bind(this),
				dropenter: this.onEnter.bind(this),
				dropleave: this.onLeave.bind(this)
			});
		},

		onEnter: function (event) {
			//this.$el.find('button').addClass('btn-material-amber');
			this.model.set('color', 'amber');
		},

		onLeave: function (event) {
			//this.$el.find('button').removeClass('btn-material-amber');
			this.model.set('color', this.originalModel.get('color'));
		}

	});

});
