define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var Panel = require('component/panel/Panel');

	var template = require('text!component/panel/Panel.hbs');

	return Component.extend({

		template: template,

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);
			var model = this.model;
			var components = model.get('components');
			if (components) {
				var width = model.get('width');
				var height = 0;
				components.each(function (component, i) {
					var model = component.get('model');
					var panel = this.add(new Panel({model: model}));
					panel.position.set(0, -i * (model.get('height')) + 30);
					// TODO unhack z-index
					panel.$el.css('z-index', 100);
					width = Math.max(width, model.get('width'));
					// TODO title height
					height += model.get('height') + 20;
				}, this);
				var padding = model.get('padding');
				model.set('width', width + padding);
				model.set('height', height + padding);
			}
		}

	});

});
