define(function (require) {
    'use strict';

    var Component = require('core/Component');
    var template = require('text!component/activity/virtualpatient/patientbody/PatientBody.hbs'); //text!
    var ActionButton = require('component/actionbutton/ActionButton'); //referencing javascript file (require js)

    return Component.extend({
        template: template,
        classes: ['patient-body'],
        styles: 'component/activity/virtualpatient/patientbody/PatientBody.css',

        initialize: function () {
            Component.prototype.initialize.apply(this, arguments);

            var button = [];
            for (var i = 0; i < 5; i++) {
                button[i] = new ActionButton({
                    model: {
                        text: '',
                        color: 'red',
                        classes: ['hotspotbutton']
                    }
                });

                button[i].position.set(i * 30, i * 30);
                button[i].scale.set(.5, .5);
                button.rotation = i * Math.PI / 4.
                this.add(button[i]);
            }

            //button.position.set(100, 100);
            //button.rotation = Math.PI/4.; ----- this.scale.set(1,1); //scales the virtual patient COMPONENT
        },

        addHotSpots: function () {
            $('#eve').click(function (e) { //e is the event that get passed to anonymous functions by click()
                var divCoords = $(this).offset();

                var relX = e.pageX - divCoords.left;          // get mouse coords relative to
                var relY = e.pageY - divCoords.top;
                relX *= 100 / $(this).width();                // convert to percent
                relY *= 100 / $(this).height();

                relX = relX.toFixed(2);
                relY = relY.toFixed(2); //round
                console.log(relX + '% : ' + relY + '%');
            });
        }


    });

});
