define(function (require) {
    "use strict";

    let _ = require('underscore');
    let Panel = require('model/Panel');

    /**
     * @class Goal
     */
    let DefinitionModel = Panel.extend({

        defaults: {
            id: null,
            /**
             * The content text of the Definition.
             */
            content: '',
            /**
             * The matching type identifier.
             */
            typeId: '0'
        },

        initialize: function () {
            // invoke super(arguments)
            Panel.prototype.initialize.apply(this, arguments);
        },

        /**
         * Verify that this Definition matches a Type.
         *
         * @param type the Type to check.
         * @return true if this Definition matches the parameter type.
         */
        matchesType: function (type) {
            let typeId = parseInt(this.get('typeId'));
            return type && type.id === typeId;
        }

    });

    // merge model schemas
    _.extend(DefinitionModel.prototype.defaults, Panel.prototype.defaults);

    return DefinitionModel;

});
