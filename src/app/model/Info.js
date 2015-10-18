define(function (require) {

    var _ = require('underscore');
    var Panel = require('model/Panel');

    var Info = Panel.extend({

        defaults: {
            title:'Case Information',
            body: 'Info',
            /**
             * The content displayed on the info card in the main area
             */
            content:'Default Info Content',
            /**
             * The truncated form of relevant information for the inventory list
             */
            short:'Relevant Information',
            /**
             * Marker to indicate whether a piece of information is relevant to the case
             */
            relevant:false
        }

    });

    _.extend(Info.prototype.defaults, Panel.prototype.defaults);

    return Info;

});
