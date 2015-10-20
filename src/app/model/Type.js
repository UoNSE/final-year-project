define(function (require) {
    "use strict";

    let _ = require('underscore');
    let Panel = require('model/Panel');

    /**
     * @class Goal
     */
    let TypeModel = Panel.extend({

        defaults: {
            id:null,
            /**
             * The content text of the Type.
             */
            content: '',
        },

        initialize: function () {
            // invoke super(arguments)
            Panel.prototype.initialize.apply(this, arguments);
        },

    });

    // merge model schemas
    _.extend(TypeModel.prototype.defaults, Panel.prototype.defaults);

    return TypeModel;

});

