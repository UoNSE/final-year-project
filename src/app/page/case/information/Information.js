define(function (require) {
	'use strict';

	let Page = require('core/Page');
	let Information = require('component/cases/case/information/Information');
	let Cases = require('collection/Cases');
	let Timeline = require('component/timeline/Timeline');

	return Page.extend({
		name: 'information',
		title: 'Case Information',
		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);
			let currentCase = this.session.get('case') || {};
			let information = currentCase.information || new Timeline();
			this.add(new Information(information, this.urlParams));
		}
	});
});
