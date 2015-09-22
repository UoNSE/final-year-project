define(function (require) {

	'use strict';

	let Panel = require('component/panel/Panel');

	return Panel.extend({

		initialize: function () {
			Panel.prototype.initialize.apply(this, arguments);
			this.interactive = true;
			this.setDraggable({opacity: 0.7});
		}

	});

});

