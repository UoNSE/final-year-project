define(function (require) {

	'use strict';

	let Component = require('core/Component');
	let template = require('text!component/case/information/Information.hbs');

	let Model = require('model/Timeline');
	let ActionButton = require('model/ActionButton');

	let Timeline = require('component/timeline/Timeline');
	let Hint = require('component/hint/Hint');

	return Component.extend({
		template: template,
		classes: 'case-information',
		styles: 'component/case/information/information.css',

		initialize: function (information, params) {
			Component.prototype.initialize.apply(this, arguments);
			this.caseId = params['case_id'];
			this.add(new Timeline({model: information}));
			var hint = this.add(new Hint({model: {text: 'Case Information'}}));
			hint.position.y = 120;
		}

	});

});
