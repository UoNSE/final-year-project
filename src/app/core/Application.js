define(function (require) {

	'use strict';

	var Backbone = require('backbone');
	var Router = require('controller/Router');
	var Scene = require('core/Scene');

	function Application () {
		this._scene = new Scene();
		this._router = new Router(this._scene);
		Backbone.history.start({pushState: true});
	}

	return Application;
});
