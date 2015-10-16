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

		initialize: function (params) {
			Component.prototype.initialize.apply(this, arguments);
			this.caseId = params['case_id'];
			let model = new Model();
			let buttons = model.get('buttons');
			buttons.add(new ActionButton({text: 'Case Background', href: this.getLink('case-information')}));
			buttons.add(new ActionButton({text: 'Virtual Patient', href: this.getLink('virtual-patient'),disabled:true }));
			this.add(new Timeline({model: model}));
			var hint = this.add(new Hint({model: {text: 'Case Information'}}));
			hint.position.y = 120;
		},

		getLink: function (name) {
			return 'cases/' + this.caseId + '/activity/' + name;
		}

	});

});
