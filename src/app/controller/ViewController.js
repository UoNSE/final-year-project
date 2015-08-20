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
				// Compile the existing template.
				var template = Handlebars.compile(this.template);
				// Get the collection and model.
				var collection = this.collection;
				var model = this.model;
				// Check if only a single collection exists.
				if (collection instanceof Backbone.Collection && !model) {
					// Execute the template with the collection in JSON format.
					html = template(collection.toJSON());
				// Check if only a model exists.
				} else if (!collection && model instanceof Backbone.Model) {
					html = template(model.toJSON());
				// Check if either a collection or model exist. This means that there is at least two models/collections.
				} else if (collection || model) {
					// Set the collection and model to either itself or an empty object to prevent errors when iterating.
					collection = collection || {};
					model  = model || {};
					// Instantiate an empty object that stores the JSON collections and models.
					var object = {};
					// Iterate over the collection and model and add their JSON values to the object.
					$.each(collection, function (key, collection) {
						object[key] = collection.toJSON();
					});
					$.each(model, function (key, model) {
						object[key] = model.toJSON();
					});
					// Execute the template with the object.
					html = template(object);
				} else {
					// No collection or models.
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
