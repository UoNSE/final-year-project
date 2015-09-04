define(function (require) {

	var Component = require('core/Component');
	var template = require('text!component/case/information/Information.hbs');

	var Buttons = require('collection/Buttons');
	var Timeline = require('component/timeline/Timeline');
	var Hint = require('component/hint/Hint');

	return Component.extend({
		template: template,
		classes: 'case-information',
		styles: 'component/case/information/information.css',

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);
			this.add(new Timeline({
				collection: new Buttons([
					{text: 'Virtual\nPatient', href: this.getLink('virtual-patient')}
				])
			}));
			var hint = this.add(new Hint({
				model: {text: 'Case Information'}
			}));
			hint.position.y = 100;
		},

		getLink: function (name) {
			return 'case/' + '1' + '/activity/' + name;
		}

	});

});
