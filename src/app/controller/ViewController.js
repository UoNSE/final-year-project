define(function (require) {

	var Backbone = require('backbone');

	return Backbone.View.extend({

		_childViews: null,

		initialize: function () {
			this._childViews = [];
			this.on('ready', this.onReady, this);
		},

		render: function () {
			var html = '';
			//  Check if the controller contains a template.
			if (this.template) {
				// Get the collection or model from the controller.
				var dataModel = this.collection || this.model;
				// Set the html based on whether the controller contains a data model.
				if (dataModel) {
					html = this.template(dataModel.toJSON());
				} else {
					html = this.template();
				}
			}
			// Set the html of the controller and trigger and after render event.
			this.$el.html(html);
			this.trigger('afterRender');
			return this;
		},

		back: function () {
			this.trigger('back');
		},

		addChildView: function (element, view) {
			this.trigger('addChildView', view);
		}

	});

});
