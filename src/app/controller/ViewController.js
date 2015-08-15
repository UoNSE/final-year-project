define(function (require) {

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');

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
				var template = Handlebars.compile(this.template);
				// Get the collection or model from the controller.
				// TODO make collections and models available
				if (this.collection) {
					html = template(this.collection.toJSON());
				} else if (this.model) {
					var model  = this.model;
					var object = {};
					model.keys().forEach(function (key, index) {
						object[key] = model.get(key).toJSON();
					});
					html = template(object);
				} else {
					html = template();
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
