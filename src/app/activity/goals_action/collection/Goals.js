define(function (require) {

    var Collection = require('collection/Collection');
    var Goal = require('model/Goal');

    return Collection.extend({
        model: Goal,
        urlFragment: '/goals'
    });

});
