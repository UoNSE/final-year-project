define(function (require) {

    var ViewController = require('controller/ViewController');
    var template = require('text!activity/goals/component/goal/GoalView.html');

    return ViewController.extend({

        template: template,

        events: {
            'click .delete-goal': 'onDeleteGoal'
        },

        onBeforeRender: function () {
            this.listenTo(this.model, 'remove', this.remove);
        },

        onDeleteGoal: function () {
            this.model.destroy();
            this.remove();
        }

    });

});
