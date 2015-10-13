define(function (require) {
	'use strict';

	var $ = require('jquery');
	var Backbone = require('backbone');

	function Session (autoLoad) {
		this.map = {};
		this.sessionStorage = window.sessionStorage;
	}

	Object.assign(Session.prototype, {
		set: function (key, value, noSave) {
			this.map[key] = value;
			if (noSave !== false) {
				this.save();
			}
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
			var promises = [];
			var sessionString = this.sessionStorage.getItem('session');
			if (sessionString !== null) {
				var session = JSON.parse(sessionString);
				for (let key in session) {
					promises.push(new Promise(function (resolve) {
						let simpleValue = session[key];
						let type = simpleValue.type;
						let value = simpleValue.value;
						if (type === 'model') {
							var id = simpleValue.id;
							require([id], function (Model) {
								var instance = new Model(value);
								if (instance.relations) {
									instance.relations.forEach(relation => {
										var relationKey = relation.key;
										var relatedModel = relation.relatedModel;

										instance.set(relationKey, new relatedModel(instance.get(relationKey)));
									});
								}
								this.set(key, instance, false);
								resolve();
							}.bind(this));
						}
						else {
							this.set(key, value, false);
							resolve();
						}
					}.bind(this)));
				}
			}
			return Promise.all(promises);
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
