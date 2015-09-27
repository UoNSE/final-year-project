define(function (require) {

	'use strict';

	let Panel = require('component/panel/Panel');

    /**
     * @class Card
     * @classdesc A generic 'Card' component class.
     */
	return Panel.extend({

		initialize: function () {
			Panel.prototype.initialize.apply(this, arguments);
            this.className = 'Card';
			this.interactive = true;
			this.setDraggable({opacity: 0.7});
		}

	});

});

