define(function (require) {
	'use strict';

	var $ = require('jquery');

	var Scene = require('core/Scene');
	var Camera = require('core/Camera');
	var Transform = require('math/Transform');
	var MathUtil = require('math/MathUtil');
	var Promise = require('bluebird');

	function CSS2DRenderer (router) {
		this.router = router;
		this.gui = $('#gui');
		this.styles = {};
	}

	Object.assign(CSS2DRenderer.prototype, {
		render: function (selector, scene, camera) {
			var container = $(selector);
			var children = scene.children;
			var transform = camera.transform.getInverse();

			for (var i = 0, length = children.length; i < length; i++) {
				var child = children[i];
				var classes = child.classes || [];
				this.renderObject(child, container, transform, classes, scene.visible);
			}
		},

		renderObject: function (object, container, parentTransform, parentClasses, parentVisible) {
			var transform;

			if (object.needsWorldUpdate) {
				transform = object.worldTransform.copy(parentTransform).applyTransform(object.transform)
			}
			else {
				object.transform.copy(object.worldTransform);
				if (object.parent) {
					object.transform.worldToLocal(object.parent.worldTransform);
				}
			}

			var classes = (parentClasses || []).slice().concat(object.classes || []);
			var visible = parentVisible && object.visible;
			this.renderObjectHTML(object, container, transform, classes, visible);
			var children = object.children;
			for (var i = 0, length = children.length; i < length; i++) {
				var child = children[i];
				this.renderObject(child, container, transform, classes, visible);
			}
			object.needsWorldUpdate = true;
		},

		renderObjectHTML: function (object, container, transform, classes, visible) {
			if (!object.added) {
				var element = object.render().$el;
				element.attr('id', object.id);
				element.addClass(classes.join(' '));
				this.linkify(element);
				container.append(element);
				this.loadStyles(object.styles).then(function () {
					object.trigger('loaded');
				});
				object.added = true;
				object.on('remove', function () {
					$('#' + object.id).remove();
					// TODO: remove style sheets
				});
			}
			object.$el.toggle(visible);
			this.applyTransform(object.$el, transform, object.origin, object.pageOrigin);
			if (object.width) {
				object.$el.width(object.width);
			}
			if (object.height) {
				object.$el.height(object.height);
			}
			object.$el.css({
				'opacity': object.opacity,
				'zIndex': object.zIndex + (object.alwaysOnTop ? 1e10 : 0)
			});
			return element;
		},

		/**
		 * Convert all child anchor tags in the given element to use the backbone's router navigate method.
		 * This means links load partial content dynamically rather than loading entire new pages.
		 *
		 * @param element The element to replace anchor tags within.
		 */
		linkify: function (element) {
			// Must use jQuery delegate events so that this function is the last to fire in the event chain.
			// Otherwise events binded with backbone fire last and animations will not have been triggered yet.
			// See http://api.jquery.com/on/#direct-and-delegated-events
			element.find('a').attr('draggable', 'false');
			element.on('click', 'a', function (e) {
				var $anchor = $(e.currentTarget);

				if (e.altKey || e.ctrlKey || e.shiftKey) {
					// Allow special browser functions, open in new tab/window etc.
					e.stopPropagation();
					return;
				}
				// Prevent page from actually loading a new URL.
				e.preventDefault();

				//animate.onFinished(function () {
				//	// Use the router navigation method instead, using the History API to simulate updating the URL.
				//	this._router.navigate($anchor.attr('href'), {trigger: true});
				//}.bind(this));
				this.router.navigate($anchor.attr('href'), {trigger: true});
			}.bind(this));
		},

		/**
		 * Loads CSS external stylesheets.
		 *
		 * @param styles The list of styles to load.
		 * @private
		 */
		loadStyles: function (styles) {
			var promises = [];
			styles = styles ? Array.isArray(styles) ? styles : [styles] : [];
			// Get the head from the HTML page.
			var $head = $('head');
			// Load necessary CSS files.
			styles.forEach(style => {
				promises.push(new Promise(function (resolve) {
					var path = require.toUrl(style);
					var $css = $('<link rel="stylesheet" type="text/css" href="' + path + '">');
					if (this.styles[path]) {
						resolve();
					} else {
						console.log('Loading', path);
						$head.append($css);
						this.styles[path] = MathUtil.generateUUID(8);
						var img = $('<img>', {src: path});
						img.on('error', function () {
							resolve();
						});
					}
				}.bind(this)));
			});
			return Promise.all(promises);
		},

		applyTransform: function (element, transform, origin, pageOrigin) {
			origin = this.normalizeCSS(origin);
			pageOrigin = this.normalizeCSS(pageOrigin);

			var x = transform.position.x + 'px';
			x = this.applyOriginOffset(x, origin[0]);
			x = this.applyPageOriginOffset(x, pageOrigin[0]);

			var y = -transform.position.y + 'px';
			y = this.applyOriginOffset(y, origin[1]);
			y = this.applyPageOriginOffset(y, pageOrigin[1]);

			$(element).css({
				'transform': 'translate(calc(' + x + '), calc(' + y + '))'
				+ ' rotateZ(' + (-transform.rotation / Math.TAU) + 'turn)'
				+ ' scale(' + transform.scale.x + ', ' + transform.scale.y + ')'
			});
		},

		normalizeCSS: function (value) {
			var values = value.split(' ');
			// follow suit from CSS properties (such as margin) which specify Y axis first
			var y = values[0];
			var x = values[1] || y;
			return [x, y];
		},

		applyOriginOffset: function (value, origin) {
			switch (origin) {
				case 'left':
				case 'top':
					return value;
				case 'center':
					return value + ' - 50%';
				case 'right':
				case 'bottom':
					return value + ' - 100%';
				default:
					throw new Error('CSS2DRenderer: Unsupported origin: ' + origin);
			}
		},

		applyPageOriginOffset: function (value, origin) {
			switch (origin) {
				case 'center':
					return value;
				case 'left':
					return value + ' - 50vw';
				case 'top':
					return value + ' - 50vh';
				case 'right':
					return value + ' + 50vw';
				case 'bottom':
					return value + ' + 50vh';
				default:
					throw new Error('CSS2DRenderer: Unsupported origin: ' + origin);
			}
		}
	});

	return CSS2DRenderer;
});

