define(function (require) {
	'use strict';

	var Backbone = require('backbone');
	var TWEEN = require('tweenjs');
	var Router = require('core/Router');
	var Scene = require('core/Scene');
	var Camera = require('core/Camera');
	var CSS2DRenderer = require('core/CSS2DRenderer');

	function Application () {
		this.scene = new Scene();
		this.camera = new Camera();
		this.session = {};
		this.router = new Router(this.scene, this.camera, this.session);
		this.renderer = new CSS2DRenderer(this.router);
		this.animateCallback = this.animate.bind(this);
		this.rendering = true;
		this.requestId = null;
		Backbone.history.start({pushState: true});
		this.startRendering();
	}
	Object.assign(Application.prototype, {
		startRendering: function () {
			this.rendering = true;
			this.requestId = requestAnimationFrame(this.animateCallback);
		},

		stopRendering: function () {
			this.rendering = false;
			cancelAnimationFrame(this.requestId);
		},

		animate: function (time) {
			this.requestId = requestAnimationFrame(this.animateCallback);
			TWEEN.update(time);
			this.renderer.render('#content', this.scene, this.camera);
		}
	});

	return Application;
});
