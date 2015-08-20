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
				// Check if either a collection or model exist.
				if (collection || model) {
					// Set the collection and model to either itself or an empty object to prevent errors when iterating.
					collection = collection || {};
					model = model || {};
					// Instantiate an empty object that stores the JSON collections and models.
					var object = {};
					// Check if there is only one collection.
					if (collection instanceof Backbone.Collection) {
						// Add a collection to the object with a collection key.
						object['collection'] = collection.toJSON();
					} else {
						// Iterate over the collections and and add the JSON values to the object.
						$.each(collection, function (key, collection) {
							object[key] = collection.toJSON();
						});
					}
					// Check if there is only one model.
					if (model instanceof Backbone.Model) {
						// Add a model to the object with a model key.
						object['model'] = model.toJSON();
					} else {
						// Iterate over the models and and add the JSON values to the object.
						$.each(model, function (key, model) {
							object[key] = model.toJSON();
						});
					}
					// Get the keys from the object and check if it only has one key that is either a model or collection.
					var keys = Object.keys(object);
					if (keys.length === 1 && (object.collection || object.model)) {
						// When there is only one key that wasn't a set object, make the object a flat value.
						object = object[keys[0]];
					}
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
