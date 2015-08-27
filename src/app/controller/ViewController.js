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
			Animate.reset();

			// Initialise the HTML.
			var html = this.template ? this._renderTemplate(this.template) : '';
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

		/**
		 * Renders the Handlebars template.
		 *
		 * @param template The Handlebars template.
		 * @returns {*} The HTML generated from the executed Handlebars template.
		 * @private
		 */
		_renderTemplate: function (template) {
			// Compile the template.
			template = Handlebars.compile(template);
			
			// Get the collection and model.
			var collection = this.collection;
			var model = this.model;
			
			// Check if no collections or models exist.
			if (!collection && !model) {
				return template();
			}
			
			// Instantiate an empty object that stores the JSON collections and models.
			var object = {};

			// Specify the key used to set a single collection and model.
			var collectionKey = 'collection';
			var modelKey = 'model';

			// Stores the specified data models in the the object.
			this._storeDataModel(object, collection, collectionKey, Backbone.Collection);
			this._storeDataModel(object, model, modelKey, Backbone.Model);
			
			// Get the keys from the object and check if it only has one key that is either a model or collection.
			var keys = Object.keys(object);
			if (keys.length === 1 && (object[collectionKey] || object[modelKey])) {
				// When there is only one key that wasn't a set object, make the object a flat value.
				object = object[keys[0]];
			}
			
			// Execute the template with the object and return it.
			return template(object);
		},

		/**
		 * Stores a representation of the data model into the object.
		 *
		 * @param object The object that will have the data model stored.
		 * @param dataModel The data model, either a collection or model.
		 * @param key The key to set on the object for a single data model.
		 * @param instance The type to check against if there is only a single data model.
		 * @private
		 */
		_storeDataModel: function (object, dataModel, key, instance) {
			// Set the object and data model to either itself or an empty object to prevent errors when accessing properties.
			object = object || {};
			dataModel = dataModel || {};
			// Check if there is only one data model.
			if (dataModel instanceof instance) {
				// Add the JSON data model to the object with the specified key.
				object[key] = dataModel.toJSON();
			} else {
				// Iterate over the data models and and add the JSON values to the object.
				$.each(dataModel, function (key, dataModel) {
					object[key] = dataModel.toJSON();
				});
			}
		},

		back: function () {
			this.trigger('back');
		},

		addNestedView: function (selector, view) {
			this.childViews.push({
				selector: selector,
				view: view
			});
			return view;
		},

		addChildView: function (selector, route, options) {
			options = options || {};
			options['selector'] = selector;
			this.trigger('addChildView', route, options);
		}

	});

});
