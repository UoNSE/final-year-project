define(function (require) {

	'use strict';

	requirejs.config({
		baseUrl: 'app',
		paths: {
			'text': '../lib/text/text',
			'backbone': '../lib/backbone/backbone',
			'underscore': '../lib/underscore/underscore',
			'ember': '../lib/ember/ember.debug',
			'handlebars': '../lib/handlebars/handlebars',
			'jquery': '../lib/jquery/dist/jquery',
			'glmatrix': '../lib/gl-matrix/dist/gl-matrix',
			'jquery.transform3d': '../lib/jquery.transform.js/jquery.transform3d',
			'jquery.transform2d': '../lib/jquery.transform.js/jquery.transform2d'
		},
		shim: {
			'backbone': {
				deps: ['jquery', 'underscore'],
				exports: 'Backbone'
			},
			'ember': {
				deps: ['jquery', 'handlebars'],
				exports: 'Ember'
			},
			'jquery.transform3d': ['jquery']
		}
	});

	require(['Application'], function (Application) {

		new Application();

	});

});
