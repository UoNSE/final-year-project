define(function (require) {
    var Collection = require('collection/Collection');
    var CaseInfoCard = require('model/CaseInfoCard');

    return Collection.extend({
        model: CaseInfoCard,
        urlFragment: '/cards'
    });
});