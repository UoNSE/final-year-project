define(function (require) {
	'use strict';

	var Scene = require('core/Scene');
	var Camera = require('core/Camera');
	var Transform = require('math/Transform');
	var $ = require('jquery');
	var Promise = require('bluebird');

	function CSS2DRenderer (router) {
		this.router = router;
		this.gui = $('#gui');
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

			if (object.detached) {
				transform = object.transform;
			}
			else if (object.needsWorldUpdate) {
				transform = object.worldTransform.copy(parentTransform).applyTransform(object.transform)
			} else {
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
				if (object.detached) {
					this.gui.append(element);
				} else {
					container.append(element);
				}
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
			if (!object.detached) {
				this.applyTransform(object.$el, transform);
			}
			if (object.width) {
				object.$el.width(object.width);
			}
			if (object.height) {
				object.$el.height(object.height);
			}
			object.$el.css('opacity', object.opacity);
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
			var head = $('head');
			// Load necessary CSS files.
			for (var i = 0, len = styles.length; i < len; i++) {
				promises.push(new Promise(function (resolve) {
					var path = require.toUrl(styles[i]);
					var css = $('<link rel="stylesheet" type="text/css" href="' + path + '">');
					head.append(css);
					var img = $('<img>', {
						src: path
					});
					img.on('error', function () {
						resolve();
					});
				}.bind(this)));
			}
			return Promise.all(promises);
		},

		applyTransform: function (element, transform) {
			$(element).css({
				'transform': 'translate(calc(-50% + ' + transform.position.x + 'px), calc(-50% + ' + (-transform.position.y) + 'px))'
				+ ' rotateZ(' + (-transform.rotation / Math.TAU) + 'turn)'
				+ ' scale(' + transform.scale.x + ', ' + transform.scale.y + ')'
			});
		}
	});

	return CSS2DRenderer;
});

