define(function (require) {

	'use strict';

	requirejs.config({
		baseUrl: 'app',
		paths: {
			'text': '../lib/text/text',
			'backbone': '../lib/backbone/backbone',
			'underscore': '../lib/underscore/underscore',
			'handlebars': '../lib/handlebars/handlebars',
			'jquery': '../lib/jquery/dist/jquery',
			'glmatrix': '../lib/gl-matrix/dist/gl-matrix-min',
			'jquery.transform3d': '../lib/jquery.transform.js/jquery.transform3d',
			'jquery.transform2d': '../lib/jquery.transform.js/jquery.transform2d',
			'jquery-ui': '../lib/jquery-ui/jquery-ui',
			'tweenjs': '../lib/tweenjs/build/tween.min',
			'bluebird': '../lib/bluebird/js/browser/bluebird'
		},
		shim: {
			'backbone': {
				deps: ['jquery', 'underscore'],
				exports: 'Backbone'
			},
			'jquery.transform3d': ['jquery'],
			'jquery-ui': ['jquery'],
			'tweenjs': {
				exports: 'TWEEN'
			}
		},
		config: {
			'core/Router': {
				routes: {
					'': 'start',
					'start': 'start',
					'cases': 'cases',
					'cases/:id/overview': 'overview',
					'cases/:id/information': 'information',
					'cases/:id/activity/virtual-patient': 'virtualPatient',
					'cases/:id/activity/issues': 'issues'
				}
			}
		}
	});

	require(['core/Application', 'addons'], function (Application) {

		new Application();

	});

});
