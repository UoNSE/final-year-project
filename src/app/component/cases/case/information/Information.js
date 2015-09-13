define(function (require) {

	var Component = require('core/Component');
	var template = require('text!component/case/information/Information.hbs');

	var ActionButtons = require('collection/ActionButtons');
	var Timeline = require('component/timeline/Timeline');
	var Hint = require('component/hint/Hint');

	return Component.extend({
		template: template,
		classes: 'case-information',
		styles: 'component/case/information/information.css',

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);
			this.add(new Timeline({
				collection: new ActionButtons([
					{text: 'Case Information', href: this.getLink('case-information')},
					{text: 'Virtual Patient', href: this.getLink('virtual-patient')}
				])
			}));
			var hint = this.add(new Hint({model: {text: 'Case Information'}}));
			hint.position.y = 120;
		},

		getLink: function (name) {
			return 'cases/' + this.model.id + '/activity/' + name;
		}

	});

});
