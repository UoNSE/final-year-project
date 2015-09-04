define(function (require) {

	'use strict';

	var Container = require('component/container/Container');

	return Container.extend({

		initialize: function () {
			Container.prototype.initialize.apply(this, arguments);
			this.interactive = true;
			this.setDraggable({opacity: 0.7});
		}

	});

});

