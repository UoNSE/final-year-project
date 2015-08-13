define(function (require) {

	var $ = require('jquery');

	var Loader = require('controller/loader/Loader');
	var Cases = require('collection/Cases');

	return Loader.extend({

		selector: '#content',
		_currentId: null,
		_cases: null,

		initialize: function () {
			this._cases = new Cases();
			this._cases.fetch();
			this.on('loadModel', this.onLoadModel, this);
			Loader.prototype.initialize.apply(this, arguments);
		},

		/**
		 * The render function that is called when a new partial is being loaded.
		 *
		 * @param controller The controller that contains the template and model information.
		 * @param options
		 */
		render: function (controller, options) {

			options = options || {};

			var parent = controller.parent;
			var selector = options.selector;
			var $element = parent ? $(parent.$el.find(selector)) : selector ? $(selector) : $(this.selector);
			$element.html(controller.$el);

			if (!parent) {
				this.linkify(controller.$el);
			}

			if (controller.onAfterRender) {
				controller.onAfterRender();
			}

		},

		/**
		 * Convert all child anchor tags in the given element to use the backbone's router navigate method.
		 * This means links load partial content dynamically rather than loading entire new pages.
		 *
		 * @param element The element to replace anchor tags within.
		 */
		linkify: function (element) {

			var anchors = element.find('a');
			anchors.each(function (index, anchor) {
				var $anchor = $(anchor);
				$anchor.on('click', function (e) {
					if (e.altKey || e.ctrlKey || e.shiftKey) {
						// Allow special browser functions, open in new tab/window etc.
						e.stopPropagation();
						return;
					}
					// Prevent page from actually loading a new URL.
					e.preventDefault();
					// Use the router navigation method instead, using the History API to simulate updating the URL.
					this._router.navigate($anchor.attr('href'), {trigger: true});
				}.bind(this));
			}.bind(this));

		},

		/**
		 * Loads a partial given the route.
		 *
		 * @param route The route that maps to the Backbone view and controller.
		 * @param [id] The current id of the route.
		 */
		load: function (route, id) {
			this._currentId = id;
			this._loadController(route);
		},

		/**
		 * Loads a model to the specified controller.
		 *
		 * @param model The model being configured.
		 */
		onLoadModel: function (model) {
			var id = this._currentId;
			if (id) {
				model.set('case', this._cases.get(id));
			}
		}

	});

});
