define(function (require) {

    'use strict';

    // templates
    let template = require('text!component/activity/casebackground/card/typedefinition/TypeDefinitionMatch.hbs');
    // components
    let Component = require('core/Component');

    /**
     * @class TypeDefinitionMatch
     */
    return Component.extend({

        template: template,

        initialize: function () {
            // super(arguments)
            Component.prototype.initialize.apply(this, arguments);
            this.className = 'TypeDefinitionMatch';
            this.setInteractive();
        }

    });

});