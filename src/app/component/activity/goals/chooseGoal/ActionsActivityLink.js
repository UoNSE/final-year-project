define(function (require) {
    "use strict";

    let template = require('text!component/activity/goals/chooseGoal/ActionsActivityLink.hbs');
    let Component = require('core/Component');

    /**
     * @class ActionsActivityLink
     */
    return Component.extend({
        // important for having fixed position near back button

        template: template,

        initialize: function () {
            Component.prototype.initialize.apply(this, arguments);
        }

    });

});