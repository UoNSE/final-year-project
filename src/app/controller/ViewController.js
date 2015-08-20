define(function (require) {

	var $ = require('jquery');
	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var Animate = require('behaviour/Animate').getInstance();

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
				var collection = this.collection;
				if (collection instanceof Backbone.Collection) {
					html = template(collection.toJSON());
				} else if (collection || this.model) {
					collection = collection || {};
					var model  = this.model || {};
					var object = {};
					$.each(collection, function (key, collection) {
						object[key] = collection.toJSON();
					});
					if (model.keys) {
						model.keys().forEach(function (key, index) {
							var child = model.get(key);
							if (child instanceof Backbone.Model) {
								object[key] = child.toJSON();
							}
						});
					}
					html = template(Object.keys(object).length > 0 ? object : model.toJSON ? model.toJSON() : model);
				} else {
					html = template();
				}
			}

			Animate.reset();

			// Set the html of the controller and trigger and after render event.
			//this.setElement(html);
			this.$el.html(html);

			// Iterate through each child view and render them.
			for (var i = 0, len = this.childViews.length; i < len; i++) {
				var child = this.childViews[i];
				var view  = child.view;
				this.$el.find(child.selector).append(view.render().$el);
			}

			this.trigger('afterRender');
			return this;
		},

		back: function () {
			this.trigger('back');
		},

		addNestedView: function (selector, view) {
			this.childViews.push({
				selector: selector,
				view: view
			});
		},

		addChildView: function (selector, route, options) {
			options = options || {};
			options['selector'] = selector;
			this.trigger('addChildView', route, options);
		}

	});

});
