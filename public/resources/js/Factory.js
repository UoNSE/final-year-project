define(function () {

	'use strict';

	return {
		createFactory: function (ObjectType) {

			var instance = null;
			return {
				getInstance: function (isSingleton) {

					if (isSingleton || isSingleton === undefined) {
						if (instance === null) {
							instance = new ObjectType();
						}
						return instance;
					} else {
						return new ObjectType();
					}

				}
			}

		}
	}
});
