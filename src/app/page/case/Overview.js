define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Overview = require('component/overview/Overview');

	var ActionButton = require('model/ActionButton');
	var Timeline = require('model/Timeline');

	return Page.extend({
		name: 'overview',
		title: 'Case Overview',
		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);
			// TODO remove hack
			if (!this.session.has('case')) {
				this.createCase(this.urlParams['case_id']);
			}
			let currentCase = this.session.get('case') || {};
			let overview = currentCase.overview || new Timeline();
			this.add(new Overview(overview, this.urlParams));
		},

		createCase: function (id) {
			this.session.get('case', () => {

				let overview = new Timeline();
				let buttons = overview.get('buttons');
				let link = (name) => {
					return 'cases/' + id + '/activity/' + name;
				};

				buttons.add(new ActionButton({text: 'Case Information', href: 'cases/' + id + '/information'}));
				buttons.add(new ActionButton({text: 'Identify Issues', href: link('issues'), disabled: true}));
				buttons.add(new ActionButton({text: 'Goals and Actions', href: link('goals'), disabled: true}));
				buttons.add(new ActionButton({text: 'Reflection', href: link('reflection'), disabled: true}));

				return {
					overview: overview
				};

			});
		}

	});
});
