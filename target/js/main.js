(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
define(function (require) {

	'use strict';

	requirejs.config({
		baseUrl: 'app',
		paths: {
			'text': '../lib/text/text',
			'backbone': '../lib/backbone/backbone',
			'underscore': '../lib/underscore/underscore',
			'handlebars': '../lib/handlebars/handlebars',
			'jquery': '../lib/jquery/dist/jquery',
			'glmatrix': '../lib/gl-matrix/dist/gl-matrix',
			'jquery.transform3d': '../lib/jquery.transform.js/jquery.transform3d',
			'jquery.transform2d': '../lib/jquery.transform.js/jquery.transform2d',
			'jquery-ui': '../lib/jquery-ui/jquery-ui'
		},
		shim: {
			'backbone': {
				deps: ['jquery', 'underscore'],
				exports: 'Backbone'
			},
			'jquery.transform3d': ['jquery'],
			'jquery-ui': ['jquery']
		}
	});

	require(['Application'], function (Application) {

		new Application();

	});

});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImRlZmluZShmdW5jdGlvbiAocmVxdWlyZSkge1xyXG5cclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdHJlcXVpcmVqcy5jb25maWcoe1xyXG5cdFx0YmFzZVVybDogJ2FwcCcsXHJcblx0XHRwYXRoczoge1xyXG5cdFx0XHQndGV4dCc6ICcuLi9saWIvdGV4dC90ZXh0JyxcclxuXHRcdFx0J2JhY2tib25lJzogJy4uL2xpYi9iYWNrYm9uZS9iYWNrYm9uZScsXHJcblx0XHRcdCd1bmRlcnNjb3JlJzogJy4uL2xpYi91bmRlcnNjb3JlL3VuZGVyc2NvcmUnLFxyXG5cdFx0XHQnaGFuZGxlYmFycyc6ICcuLi9saWIvaGFuZGxlYmFycy9oYW5kbGViYXJzJyxcclxuXHRcdFx0J2pxdWVyeSc6ICcuLi9saWIvanF1ZXJ5L2Rpc3QvanF1ZXJ5JyxcclxuXHRcdFx0J2dsbWF0cml4JzogJy4uL2xpYi9nbC1tYXRyaXgvZGlzdC9nbC1tYXRyaXgnLFxyXG5cdFx0XHQnanF1ZXJ5LnRyYW5zZm9ybTNkJzogJy4uL2xpYi9qcXVlcnkudHJhbnNmb3JtLmpzL2pxdWVyeS50cmFuc2Zvcm0zZCcsXHJcblx0XHRcdCdqcXVlcnkudHJhbnNmb3JtMmQnOiAnLi4vbGliL2pxdWVyeS50cmFuc2Zvcm0uanMvanF1ZXJ5LnRyYW5zZm9ybTJkJyxcclxuXHRcdFx0J2pxdWVyeS11aSc6ICcuLi9saWIvanF1ZXJ5LXVpL2pxdWVyeS11aSdcclxuXHRcdH0sXHJcblx0XHRzaGltOiB7XHJcblx0XHRcdCdiYWNrYm9uZSc6IHtcclxuXHRcdFx0XHRkZXBzOiBbJ2pxdWVyeScsICd1bmRlcnNjb3JlJ10sXHJcblx0XHRcdFx0ZXhwb3J0czogJ0JhY2tib25lJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHQnanF1ZXJ5LnRyYW5zZm9ybTNkJzogWydqcXVlcnknXSxcclxuXHRcdFx0J2pxdWVyeS11aSc6IFsnanF1ZXJ5J11cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0cmVxdWlyZShbJ0FwcGxpY2F0aW9uJ10sIGZ1bmN0aW9uIChBcHBsaWNhdGlvbikge1xyXG5cclxuXHRcdG5ldyBBcHBsaWNhdGlvbigpO1xyXG5cclxuXHR9KTtcclxuXHJcbn0pO1xyXG4iXX0=
