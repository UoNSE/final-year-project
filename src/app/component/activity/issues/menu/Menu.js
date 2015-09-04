define(function (require) {

	'use strict';

	var Component = require('component/actionbutton/ActionButton');

	var ActionButton = require('model/ActionButton');

	var Delete = require('component/activity/issues/menu/actionbutton/delete/Delete');
	var Split = require('component/activity/issues/menu/actionbutton/split/Split');

	return Component.extend({

		template: '',
		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);

			this.color = 'yellow';

			this.delete = this.addDeleteButton();
			this.split = this.addSplitButton();

			this.delete.position.set(75, -200);
			this.split.position.set(-75, -200);

		},

		addDeleteButton: function () {
			return this.add(new Delete({
				model: new ActionButton({
					icon: 'action-delete',
					color: this.color
				})
			}));
		},

		addSplitButton: function () {
			return this.add(new Split({
				model: new ActionButton({
					icon: 'content-content-cut',
					color: this.color
				})
			}));
		},

		hide: function () {
			this.delete.$el.hide();
			this.split.$el.hide();
		},

		show: function () {
			this.delete.$el.show();
			this.split.$el.show();

		}

	});

});

