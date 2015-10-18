define(function (require) {

    var Collection = require('collection/Collection');
    var Info = require('model/Info');

    return Collection.extend({
        model: Info,
        urlFragment: '/info'
    });

});
