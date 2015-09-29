define(function (require) {

	'use strict';

	requirejs.config({
		baseUrl: 'app',
		paths: {
			'text': '../lib/text/text',
			'backbone': '../lib/backbone/backbone',
			'backbone-relational': '../lib/backbone-relational/backbone-relational',
			'underscore': '../lib/underscore/underscore',
			'handlebars': '../lib/handlebars/handlebars',
			'jquery': '../lib/jquery/dist/jquery',
			'glmatrix': '../lib/gl-matrix/dist/gl-matrix-min',
			'jquery.transform3d': '../lib/jquery.transform.js/jquery.transform3d',
			'jquery.transform2d': '../lib/jquery.transform.js/jquery.transform2d',
			'jquery-ui': '../lib/jquery-ui/jquery-ui',
			'tweenjs': '../lib/tweenjs/build/tween.min',
			'bluebird': '../lib/bluebird/js/browser/bluebird',
			'es6-shim': '../lib/es6-shim/es6-shim',
			'annyang': '../lib/annyang/annyang',
			'mespeak': '../lib/mespeak/mespeak'

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
					'': 'Start',
					'start': 'Start',
					'cases': 'Cases',
					'cases/:case_id/overview': 'case/Overview',
					'cases/:case_id/information': 'case/information/Information',
					'cases/:case_id/activity/virtual-patient': 'activity/VirtualPatient',
					'cases/:case_id/activity/issues': 'activity/Issues',
					'cases/:case_id/activity/issues/unlock': 'activity/issues/TopicUnlock',
                    'cases/:case_id/activity/goals': 'activity/Goals',
                    'cases/:case_id/activity/actions': 'activity/Actions'
				},
				sitemap: {
					'Start': {
						'Cases': {
							'case/Overview': {
								'case/information/Information': {
									'activity/VirtualPatient': null
								},
								'activity/Issues': {
									'activity/issues/TopicUnlock': null
								},
                                'activity/Goals': {
                                    'activity/Actions': null
                                }
							}
						}
					}
				}
			}
		}
	});

	// require(['core/Application', 'es6-shim', 'addons', 'backbone-relational'], function (Application) {
	require(['core/Application', 'es6-shim', 'addons', 'backbone-relational'], function (Application) {
		new Application();
	});

});
