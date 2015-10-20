define(function (require) {
	'use strict';

	var Object2D = require('core/Object2D');
	var BackButton = require('component/backbutton/BackButton');
	var Vector2 = require('math/Vector2');

	var ActionButton = require('model/ActionButton');
	var Timeline = require('model/Timeline');

	return Object2D.extend({
		showBackButton: true,
		title: 'Page',
		initialize: function (router, camera, urlParams, session) {
			Object2D.prototype.initialize.apply(this, arguments);
            this.router = router;
			this.camera = camera;
			this.urlParams = urlParams;
			this.session = session;
			if (this.showBackButton) {
				this.backButton = this.add(new BackButton(router));
				this.backButton.on('back', this.onBack.bind(this));
			}
			// TODO remove hack
			let id = this.urlParams['case_id'];
			if (!this.session.has('case') && id) {
				this.createCase(id);
			}
		},

		createCase: function (id) {
			this.session.get('case', () => {

				let overview = new Timeline();
				let information = new Timeline();
				let link = (name) => {
					return 'cases/' + id + '/activity/' + name;
				};

				let overviewButtons = overview.get('buttons');
				overviewButtons.add(new ActionButton({text: 'Case Information', href: 'cases/' + id + '/information'}));
				overviewButtons.add(new ActionButton({text: 'Identify Issues', href: link('issues'), disabled: true}));
				overviewButtons.add(new ActionButton({text: 'Goals and Actions', href: link('goals'), disabled: true}));
				overviewButtons.add(new ActionButton({text: 'Reflection', href: link('reflection'), disabled: true}));

				let informationButtons = information.get('buttons');
				informationButtons.add(new ActionButton({text: 'Case Background', href: link('case-information')}));
				informationButtons.add(new ActionButton({text: 'Virtual Patient', href: link('virtual-patient'), disabled: true}));

				return {
					overview: overview,
					information: information
				};

			});
		},

		// Override in submodule to modify.
		onBack: function () {
		},

		// Override in submodule to modify.
		onPageEnter: function () {
			this.scale.set(0, 0);

			return new TWEEN.Tween(this.scale)
				.to(Vector2.ones())
				.easing(TWEEN.Easing.Elastic.Out)
				.start()
				.promise();
		},

		// Override in submodule to modify.
		onPageLeave: function () {
			return new TWEEN.Tween(this.scale)
				.to(Vector2.zeros(), 500)
				.easing(TWEEN.Easing.Back.In)
				.start()
				.promise();
		}

	});
});
