define(function () {
	'use strict';

	function Factory (ObjectType) {
		this.instance = null;
		this.ObjectType = ObjectType;
	}

	Object.assign(Factory, {
		createFactory: function (ObjectType) {
			return new Factory(ObjectType);
		}
	});

	Object.assign(Factory.prototype, {
		getInstance: function (isSingleton) {
			if (isSingleton || isSingleton === undefined) {
				if (this.instance === null) {
					this.instance = new this.ObjectType();
				}
				return this.instance;
			} else {
				return new this.ObjectType();
			}

		}
	});

	return Factory;
});
