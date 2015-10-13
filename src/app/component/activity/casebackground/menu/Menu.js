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

			this.bindEvents();

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

		bindEvents: function () {
			this.listenTo(this.delete, 'dragendsink', this.onDelete.bind(this));
			this.listenTo(this.split, 'dragendsink', this.onSplit.bind(this));
		},

		onDelete: function (event) {
			this.trigger('delete', event);
		},

		onSplit: function (event) {
			this.trigger('split', event);
		}

	});

});

