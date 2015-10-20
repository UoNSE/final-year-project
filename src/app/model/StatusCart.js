//StatusCart tells the user how many of the correct evidence modules they've found, and assists users in
//based on Help model (add _.extend dependancies!!!?)

define(function (require) {

    var _ = require('underscore');
    var Panel = require('model/Panel');
    var EvidenceCollection = require('collection/Evidence')

    var StatusCart = Panel.extend({});

    _.extend(StatusCart.prototype.defaults, Panel.prototype.defaults, {
        title: 'StatusCart',
        width: 300
        // collection: EvidenceCollection
    });

    return StatusCart;

});
