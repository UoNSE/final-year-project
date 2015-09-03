define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Overview = require('component/overview/Overview');

	return Page.extend({
		name: 'overview',
		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);

			this.add(new Overview({
				model: {
					caseId: this.urlParams.id
				}
			}));
			//Animate.scale($(this.selector), {duration: 1000});
			//Animate.scale($('#btn-case-overview'), {
			//	css: {fontSize: 20},
			//	delay: 500,
			//	duration: 1000
			//});
		}
	});
});

