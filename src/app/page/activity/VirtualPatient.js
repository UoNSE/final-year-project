define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var VirtualPatient = require('component/activity/virtualpatient/VirtualPatient');

	return Page.extend({
		name: 'virtualpatient',
		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);
			this.add(new VirtualPatient());
		}
	});
});
