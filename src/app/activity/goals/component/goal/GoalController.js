define(function (require) {

    var ViewController = require('controller/ViewController');

    return ViewController.extend({

        events: {
            'click .delete-goal': 'onDeleteGoal'
        },

        onBeforeRender: function () {
            this.listenTo(this.model, 'remove', this.remove)
        },

        onDeleteGoal: function (e) {
            e.preventDefault();
            this.model.destroy();
        }

    });

});
