define(function (require) {

	var Backbone = require('backbone');
	var animate = require('behaviour/Animate').getInstance();
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
						var child = model.get(key);
						if (child instanceof Backbone.Model) {
							object[key] = child.toJSON();
						}
					});
					html = template(Object.keys(object).length > 0 ? object : model.toJSON());
				} else {
					html = template();
				}
			}

			animate.reset();

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

		addChildView: function (selector, route, options) {
			options = options || {};
			options['selector'] = selector;
			this.trigger('addChildView', route, options);
		}

	});

});
