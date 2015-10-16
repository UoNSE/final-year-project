define(function (require) {
	'use strict';

	var $ = require('jquery');

	function Session () {
		this.map = {};
	}

	Object.assign(Session.prototype, {
		set: function (key, value) {
			this.map[key] = value;
		},

		get: function (key, defaultValue) {
			if (key in this.map) {
				return this.map[key];
			}
			else if (defaultValue !== undefined) {
				this.map[key] = $.isFunction(defaultValue) ? defaultValue(): defaultValue;
				return this.map[key];
			}
			else {
				throw new Error('Session key does not exist: ' + key);
			}
		},

		has: function (key) {
			return key in this.map;
		},

		remove: function (key) {
			delete this.map[key];
		}
	});

	return Session;
});
