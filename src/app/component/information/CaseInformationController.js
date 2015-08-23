define(function (require) {

	var $ = require('jquery');

	var ViewController = require('controller/ViewController');
	var animate = require('behaviour/Animate').getInstance();

	return ViewController.extend({

		styles: 'case-information.css',

		events: {
			'click .case-information .title': 'onTitle',
			'click #patient-background': 'onPatientBackground',
			'click #context': 'onContext',
			'click #background': 'onBackground',
			'click #virtual-patient': 'onVirtualPatient'
		},

		onAfterRender: function () {
			var menuItems = $('.case-information .menu .menu-item');
			var distance = 375;
			var min = 3 * Math.PI / 4;
			var max = 5 * Math.PI / 4;
			animate.scale($('.case-information .title'));
			for (var i = 0, len = menuItems.length; i < len; i++) {
				var menuItem = $(menuItems[i]);
				var angle = min + ((i / len) * (max - min));
				var width = Math.abs($(menuItem.children(0)).width() * 0.5 - $(menuItem.children(1)).width() * 0.5);
				animate.scale(menuItem, {
					delay: i * 50,
					animate: {
						top: -distance * Math.sin(angle),
						left: distance * Math.cos(angle) - width
					}
				});
			}
		},

		onTitle: function () {
			this.back();
		},

		onPatientBackground: function () {
			// TODO
		},

		onVirtualPatient: function () {
			// TODO
		},

		onContext: function () {
			// TODO
		},

		onBackground: function () {
			animate.scaleOut($('.case-information'), {
				duration: 500,
				easing: 'easeInBack'
			});
		}

	});

});
