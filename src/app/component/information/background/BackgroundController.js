define(function (require) {

	var $ = require('jquery');
	var glm = require('glmatrix');

	var ViewController = require('controller/ViewController');

	var template = require('text!component/information/background/BackgroundView.html');

	var Animate = require('behaviour/Animate').getInstance();
	var MultiTouchManager = require('behaviour/MultiTouchManager');
	var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');

	return ViewController.extend({

		template: template,
		elements: $(),
		multitouch: MultiTouchManager.getInstance(),
		urls: ['box.gif', 'spiral.gif', 'torus.gif', 'triangle.gif'],
		styles: 'background.css',

		initialize: function () {
			ViewController.prototype.initialize.apply(this, arguments);
			this.render();
		},

		onAfterRender: function () {
			this.addChildView('.background', 'component/inventory/Inventory', {
				append: true
			});
			this.addItems();
		},

		addItems: function () {
			var resources = [
				'<video src="resources/video/animation.mp4" type="video/mp4" class="item" autoplay loop muted>',
				'<img src="resources/images/human.jpg" class="item" />',
				'<img src="resources/images/nursing5.jpg" class="item" />',
				'<img src="resources/images/health-and-nursing.jpg" class="item" />',
				'<video src="resources/video/hifi2.mp4" type="video/mp4" class="item" autoplay loop muted>'
			];
			var transforms = [
				[glm.vec3.fromValues(300, 100, 0), glm.vec3.fromValues(0.5, 0.5, 1), 0],
				[glm.vec3.fromValues(-300, 0, 0), glm.vec3.fromValues(0.5, 0.5, 1), 0],
				[glm.vec3.fromValues(0, 100, 0), glm.vec3.fromValues(0.5, 0.5, 1), 0],
				[glm.vec3.fromValues(300, -100, 0), glm.vec3.fromValues(0.5, 0.5, 1), 0],
				[glm.vec3.fromValues(0, -100, 0), glm.vec3.fromValues(1, 1, 1), 0]
			];
			var numItems = resources.length;
			var container = $('<div class="abs-center"></div>');
			container.appendTo($('#content'));
			for (var i = 0; i < numItems; i++) {
				var element = $(resources[i]);
				element.addClass("abs-center").appendTo(container);
				element.css('transform', transforms[i]);
				//var colors = ['#ff0000', '#ffffff', '#d4ee9f'];
				//element.css('backgroundColor', colors[Math.floor(Math.random() * colors.length)]);
				var multiTouchElement = this.multitouch.addElement(element);
				var behaviour = new RotateTranslateScaleBehaviour(multiTouchElement);
				multiTouchElement.addBehaviour(behaviour);
				glm.vec3.copy(behaviour.translation, transforms[i][0]);
				glm.vec3.copy(behaviour.scale, transforms[i][1]);
				glm.vec3.copy(behaviour.rotation, transforms[i][2]);
				behaviour.needsUpdate();
				this.elements = this.elements.add(element);
			}
			animate.scale(container);
		}

	});

});
