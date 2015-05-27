define(function (require) {

	var $ = require('jquery');
	require('jquery.transform2d');
	require('jquery.transform3d');
	require('jquery-ui');
	var Handlebars = require('handlebars');
	var Controller = require('controller/Controller');
	var template = require('text!view/CaseInformation.html');
	var styles = [
		'../resources/css/case-information.css'
	];

	return Controller.extend({
		template: Handlebars.compile(template),
		styles: styles,
		render: function () {
			this.bindEvents();
			var menuItems = $('.case-information .menu .menu-item');
			var distance = 375;
			var min = 3 * Math.PI / 4;
			var max = 5 * Math.PI / 4;
			var title = $('.case-information .title');
			title.css({
				transform: 'scale(0)'
			}).animate({
				transform: 'scale(1)'
			}, {
				duration: 1500,
				easing: 'easeOutElastic'
			});
			for (var i = 0, len = menuItems.length; i < len; i++) {
				var menuItem = $(menuItems[i]);
				var angle = min + ((i / len) * (max - min));
				var width = Math.abs($(menuItem.children(0)).width() * 0.5 - $(menuItem.children(1)).width() * 0.5);
				menuItem.css({
					transform: 'scale(0)'
				});
				menuItem.delay(i * 50).animate({
					top: -distance * Math.sin(angle),
					left: distance * Math.cos(angle) - width,
					transform: 'scale(1)'
				}, {
					duration: 1500,
					easing: 'easeOutElastic'
				});
			}
		},
		bindEvents: function () {
			$('.title').on('click', this.onTitle.bind(this));
			$('#patient-background').on('click', this.onPatientBackground.bind(this));
			$('#context').on('click', this.onContext.bind(this));
			$('#background').on('click', this.onBackground.bind(this));
		},
		onTitle: function () {
			this.loadPrevious();
		},
		onPatientBackground: function () {
			// TODO
		},
		onContext: function () {
			// TODO
		},
		onBackground: function () {
			this.load('controller/Background');
		}
	});

});
