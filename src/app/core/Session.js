define(function (require) {
	'use strict';

	var $ = require('jquery');
	var Backbone = require('backbone');

	function Session (autoLoad) {
		this.map = {};
		this.sessionStorage = window.sessionStorage;
		if (autoLoad !== false) {
			this.load();
		}
	}

	Object.assign(Session.prototype, {
		set: function (key, value) {
			this.map[key] = value;
			this.save();
		},

		get: function (key, defaultValue) {
			if (key in this.map) {
				return this.map[key];
			}
			else if (defaultValue !== undefined) {
				this.map[key] = $.isFunction(defaultValue) ? defaultValue(): defaultValue;
				this.save();
				return this.map[key];
			}
			else {
				throw new Error('Session key does not exist: ' + key);
			}
		},

		remove: function (key) {
			delete this.map[key];
			this.save();
		},

		clear: function () {
			for (let key in this.map) {
				delete this.map[key];
			}
			this.save();
		},

		save: function () {
			this.sessionStorage.setItem('session', this.toJSON());
		},

		load: function () {
			var sessionString = this.sessionStorage.getItem('session');
			if (sessionString !== null) {
				var session = JSON.parse(sessionString);
				for (let key in session) {
					let simpleValue = session[key];
					let type = simpleValue.type;
					let value = simpleValue.value;
					if (type === 'model') {
						var id = simpleValue.id;
						require([id], function (Model) {
							this.set(key, new Model(value))
						}.bind(this));
					}
					else {
						this.set(key, value);
					}
				}
			}
		},

		toJSON: function () {
			var simpleMap = {};
			for (let key in this.map) {
				let value = this.map[key];
				let simpleValue = {};
				if (value instanceof Backbone.Model) {
					simpleValue.type = 'model';
					simpleValue.value = value.toJSON();
					simpleValue.id = value.id;
				}
				else {
					simpleValue.type = 'simple';
					simpleValue.value = value;
				}
				simpleMap[key] = simpleValue;
			}
			return JSON.stringify(simpleMap);
		}
	});

	return Session;
});
