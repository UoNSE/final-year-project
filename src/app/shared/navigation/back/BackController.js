define(function (require) {

	'use strict';

	var Controller = require('controller/Controller');
	var template = require('text!shared/navigation/back/BackView.html');

	return Controller.extend({

		template: template,
		_selector: '#back',

		render: function () {
			this._bindEvents();
		},

		_bindEvents: function () {
			$(this._selector).on('click', this._onBack.bind(this));
		},

		_onBack: function () {
			this.trigger('back');
		}

	});

});
