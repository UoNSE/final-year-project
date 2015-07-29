define(function (require) {

	var $ = require('jquery');

	var Controller = require('controller/Controller');
	var Animate = require('behaviour/Animate');

	var template = require('text!component/information/CaseInformationView.html');
	var styles = [
		'case-information.css'
	];

	return Controller.extend({

		template: template,
		styles: styles,

		render: function () {
			this._bindEvents();
			var menuItems = $('.case-information .menu .menu-item');
			var distance = 375;
			var min = 3 * Math.PI / 4;
			var max = 5 * Math.PI / 4;
			Animate.scale($('.case-information .title'));
			for (var i = 0, len = menuItems.length; i < len; i++) {
				var menuItem = $(menuItems[i]);
				var angle = min + ((i / len) * (max - min));
				var width = Math.abs($(menuItem.children(0)).width() * 0.5 - $(menuItem.children(1)).width() * 0.5);
				Animate.scale(menuItem, {
					delay: i * 50,
					animate: {
						top: -distance * Math.sin(angle),
						left: distance * Math.cos(angle) - width
					}
				});
			}
		},

		_bindEvents: function () {
			$('#patient-background').on('click', this._onPatientBackground.bind(this));
			$('#context').on('click', this._onContext.bind(this));
			$('#background').on('click', this._onBackground.bind(this));
		},

		_onPatientBackground: function () {
			// TODO
		},

		_onContext: function () {
			// TODO
		},

		_onBackground: function () {
			Animate.scaleOut($('.case-information'), {
				duration: 500,
				easing: 'easeInBack',
				complete: function () {
					this.load('case/information/background');
				}.bind(this)
			});
		}

	});

});
