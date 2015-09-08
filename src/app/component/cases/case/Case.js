define(function (require) {
	'use strict';

	var ActionButton = require('component/actionbutton/ActionButton');

	return ActionButton.extend({
		classes: 'case',
		styles: 'component/cases/case/Case.css'
	});

});
