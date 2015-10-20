define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/actionbuttonhandle/ActionButtonHandle.hbs');

	return Component.extend({
		template: template,
		classes: ['cpn-actionbutton-handle'],
		styles: 'component/actionbuttonhandle/ActionButtonHandle.css',

		events: {
			'click .cpn-actionbutton': 'onClick'
		}

		// onClick:function(event){
		// 	this.trigger('click',event);
		// }
	});


});
