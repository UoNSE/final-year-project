define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Information = require('component/cases/case/information/Information');
	var Cases = require('collection/Cases');

	return Page.extend({
		name: 'information',
		title: 'Case Information',
		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);
			this.add(new Information(this.urlParams));
		}
	});
});
