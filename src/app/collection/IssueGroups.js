define(function (require) {

    var Collection = require('collection/Collection');
    var IssueGroup = require('model/IssueGroup');

    return Collection.extend({
        model: IssueGroup,
        urlFragment: '/issueGroup'
    });

});
