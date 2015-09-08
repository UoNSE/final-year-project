define(function (require) {
	'use strict';

	var Object2D = require('core/Object2D');
	var VirtualPatient = require('component/activity/virtualpatient/VirtualPatient');

	return Object2D.extend({
		name: 'virtualPatient',
		initialize: function () {
			Object2D.prototype.initialize.apply(this, arguments);
			this.add(new VirtualPatient());
		}
	});
});
