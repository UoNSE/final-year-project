define(function (require) {

	var _ = require('underscore');
	var Panel = require('model/Panel');

	var Container = Panel.extend({

		defaults: {
			components: null,
			padding: 20
		}

	});

	_.extend(Container.prototype.defaults, Panel.prototype.defaults);

	return Container;

});
