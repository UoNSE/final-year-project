define(function (require) {
	'use strict';

	requirejs.config({
		paths: {
			'jquery': '/lib/jquery/dist/jquery'
		}
	});

	require(['app']);

});
