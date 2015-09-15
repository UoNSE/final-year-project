define(function (require) {
	'use strict';

	var $ = require('jquery');

	var Object2D = require('core/Object2D');
	var Handlebars = require('handlebars');
	var multiTouchManager = require('behaviour/MultiTouchManager').getInstance();

	return Object2D.extend({
		tagName: 'section',
		attributes: {
			'class': 'component'
		},
		multiTouchElement: null,
		template: '',
		classes: [],
		width: null,
		height: null,

		initialize: function () {
			Object2D.prototype.initialize.apply(this, arguments);

			var interactive = false;
			Object.defineProperties(this, {
				interactive: {
					enumerable: true,
					get: function () {
						return interactive;
					},
					set: function (value) {
						if (interactive != value) {
							interactive = value;
							this.onSetInteractive(value);
						}
					}
				}
			});
		},

		render: function () {
			this.$el.html(this.renderTemplate(this.template));
			return this;
		},

		/**
		 * Renders the Handlebars template.
		 *
		 * @param template The Handlebars template.
		 * @returns {*} The HTML generated from the executed Handlebars template.
		 */
		renderTemplate: function (template) {
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
			this.storeDataModel(object, collection, collectionKey, Backbone.Collection);
			this.storeDataModel(object, model, modelKey, Backbone.Model);

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
		 */
		storeDataModel: function (object, dataModel, key, instance) {
			// Set the object and data model to either itself or an empty object to prevent errors when accessing properties.
			object = object || {};
			dataModel = dataModel || {};
			// Check if there is only one data model.
			if (dataModel instanceof instance) {
				this.bindDataModelEvents(dataModel);
				// Add the JSON data model to the object with the specified key.
				object[key] = dataModel.toJSON();
			} else {
				// Iterate over the data models and and add the JSON values to the object.
				$.each(dataModel, function (key, dataModel) {
					this.bindDataModelEvents(dataModel);
					object[key] = dataModel.toJSON ? dataModel.toJSON() : dataModel;
				}.bind(this));
			}
		},

		bindDataModelEvents: function (model) {
			this.listenTo(model, 'change', this.render);
		},

		getMultiTouchElement: function () {
			if (!this.multiTouchElement) {
				this.multiTouchElement = multiTouchManager.addElement(this);
			}
			return this.multiTouchElement;
		},

		onSetInteractive: function (enabled) {
			// TODO: handle remove
			multiTouchManager.makeRTS(this.getMultiTouchElement());
		},

		setDraggable: function (options) {
			// TODO: handle remove
			multiTouchManager.makeDraggable(this.getMultiTouchElement(), options);
		},

		setDroppable: function (options) {
			// TODO: handle remove
			multiTouchManager.makeDroppable(this.getMultiTouchElement(), options);
		}
	});
});

