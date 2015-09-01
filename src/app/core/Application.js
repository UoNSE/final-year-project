define(function (require) {

	'use strict';

	var Backbone = require('backbone');
	var Router = require('core/Router');
	var Scene = require('core/Scene');
	var Camera = require('core/Camera');
	var CSS2DRenderer = require('core/CSS2DRenderer');

	function Application () {
		this.scene = new Scene();
		this.renderer = new CSS2DRenderer();
		this.router = new Router(this.scene);
		this.camera = new Camera();
		Backbone.history.start({pushState: true});
		this.animate();
	}

	Application.prototype.animate = function (time) {
		requestAnimationFrame(this.animate.bind(this));
		TWEEN.update(time);
		this.renderer.render('#content', this.scene, this.camera);
	};

	return Application;
});
