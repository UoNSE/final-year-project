define(function (require) {

	var $ = require('jquery');

	var ViewController = require('controller/ViewController');
	var animate = require('behaviour/Animate').getInstance();

	var styles = [
		'case-information.css'
	];

	return ViewController.extend({

		styles: styles,

		events: {
			'click .case-information .title': '_onTitle',
			'click #patient-background': '_onPatientBackground',
			'click #context': '_onContext',
			'click #background': '_onBackground'
		},

		_onAfterRender: function () {
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

		_onTitle: function () {
			this.back();
		},

		_onPatientBackground: function () {
			// TODO
		},

		_onContext: function () {
			// TODO
		},

		_onBackground: function () {
			animate.scaleOut($('.case-information'), {
				duration: 500,
				easing: 'easeInBack'
			});
		}

	});

});
