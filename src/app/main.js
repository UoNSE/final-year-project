define(function (require) {

	'use strict';

	requirejs.config({
		paths: {
			'jquery': '../lib/jquery/dist/jquery',
			'glmatrix': '../lib/gl-matrix/dist/gl-matrix'
		}
	});

	require(['Application'], function (Application) {

		new Application();

	});

});
