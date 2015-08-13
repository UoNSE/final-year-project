define(function (require) {

	var Backbone = require('backbone');

	return Backbone.View.extend({

		childViews: null,

		initialize: function () {
			this.childViews = [];
			this.on('beforeRender', this.onBeforeRender, this);
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

			// Iterate through each child view and render them.
			for (var i = 0, len = this.childViews.length; i < len; i++) {
				this.childViews[i].render();
			}

			// Set the html of the controller and trigger and after render event.
			this.$el.html(html);
			this.trigger('afterRender');
			return this;
		},

		back: function () {
			this.trigger('back');
		},

		addChildView: function (selector, route) {
			this.trigger('addChildView', selector, route);
		}

	});

});
