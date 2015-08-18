define(function (require) {
    var Collection = require('collection/Collection');
    var CaseInfo = require('model/CaseInfo');

    return Collection.extend({
        model: CaseInfo,
        urlFragment: '/caseinfo'
    });
});