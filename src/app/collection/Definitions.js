define(function (require) {

    var Collection = require('collection/Collection');
    var Definition = require('model/Definition');

    return Collection.extend({
        model: Definition,
        urlFragment: '/definitions'
    });

});