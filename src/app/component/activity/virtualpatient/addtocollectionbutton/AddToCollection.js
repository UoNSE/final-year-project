define(function (require) {
	'use strict';

	var Component = require('component/actionbutton/ActionButton');
	var ActionButton = require('model/ActionButton');
	var Delete = require('component/activity/issues/menu/actionbutton/delete/Delete');

	return Component.extend({
		template: '',
		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);

			this.color = 'green';
			this.addtocollectionbutton = this.createAddToCollectionButton();
			this.addtocollectionbutton.position.set(500, -300);
			this.addtocollectionbutton.setInteractive();
			this.addtocollectionbutton.setDraggable();
			this.bindEvents();
		},

		// this should be changed over to use a AddTOCollection button
		// which will just be a delete button (to be semantically correct)
		// creates button
		createAddToCollectionButton: function () {
			return this.add(new Delete({
				model: new ActionButton({
					icon: 'content-add',
					color: this.color
				})
			}));
		},

		bindEvents: function () {
			this.listenTo(this.addtocollectionbutton, 'dragendsink', this.onDelete.bind(this));
		},

		// triggers event
		onDelete: function (event) {
			this.trigger('addToCollection', event);
		},
	});
});
