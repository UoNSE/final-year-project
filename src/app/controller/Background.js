define(function (require) {

	var $ = require('jquery');
	var Handlebars = require('handlebars');
	var glm = require('glmatrix');
	var Controller = require('controller/Controller');
	var template = require('text!view/Background.html');
	var MultiTouchManager = require('behaviour/MultiTouchManager');
	var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');
	var Box = require('controller/Box');
	var Video = require('controller/Video');

	return Controller.extend({
		//styles: styles,
		template: Handlebars.compile(template),
		elements: $(),
		multitouch: MultiTouchManager.getInstance(),
		urls: ['box.gif', 'spiral.gif', 'torus.gif', 'triangle.gif'],
		render: function () {
			this.bindEvents();
			this.addItems();
		},
		bindEvents: function () {
			$('#back').on('click', this.onBack.bind(this));
		},
		onBack: function () {
			this.loadPrevious();
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
				[glm.vec3.fromValues(500, 200, 0), glm.vec3.fromValues(1, 1, 1), 0],
				[glm.vec3.fromValues(-500, 0, 0), glm.vec3.fromValues(1, 1, 1), 0],
				[glm.vec3.fromValues(0, 200, 0), glm.vec3.fromValues(1, 1, 1), 0],
				[glm.vec3.fromValues(500, -150, 0), glm.vec3.fromValues(1, 1, 1), 0],
				[glm.vec3.fromValues(0, -150, 0), glm.vec3.fromValues(2, 2, 1), 0]
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
			container.css({
				transform: 'scale(0)'
			}).animate({
				transform: 'scale(1)'
			}, {
				duration: 1500,
				easing: 'easeOutElastic'
			});
		}
	});

});
