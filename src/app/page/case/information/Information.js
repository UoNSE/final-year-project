define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Information = require('component/cases/case/information/Information');
	var Cases = require('collection/Cases');

	return Page.extend({
		name: 'information',
		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);
			new Cases().fetch({
				data: {
					id: this.urlParams['case_id']
				}
			}).then(function (cases) {
				this.add(new Information({
					model: cases[0]
				}));
			}.bind(this));
		}
	});
});
