$(document).ready(function() {



});

define(function (require) {
    'use strict';

    var Component = require('core/Component');
    var template = require('text!component/activity/virtualpatient/patientbody/PatientBody.hbs'); //text!
    var ActionButton = require('component/actionbutton/ActionButton'); //referencing javascript file (require js)
    var Hotspots = require('collection/Hotspots'); //HotspotData from db.json, collections, model

    return Component.extend({
        template: template,
        classes: ['patient-body'],
        styles: 'component/activity/virtualpatient/patientbody/PatientBody.css',
        collection: { //we say the component has a collection (collection of models)
            hotspots: new Hotspots() //, newCollection: new Newvalue()

        },
        events: {
            'click .vpb': 'logPos'
        },

        initialize: function () {
            Component.prototype.initialize.apply(this, arguments);

            this.listenTo(this.collection.hotspots, 'sync', this.onHotspots.bind(this));
            //THE onHotspots() method ADDS THE HOTSPOTS
            //add a listener (listening to sync (backbone thing))
            //checks the collection has fully loaded

            this.collection.hotspots.fetch();
            //linking to the collection: { hotpots } key
            //if you dont call fecth(), the collection will always be empty (fetch calls ajax event under the hood)


            /*
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
                button.rotation = i * Math.PI / 4;
                this.add(button[i]);
            }
            */

            //button.position.set(100, 100);
            //button.rotation = Math.PI/4.; ----- this.scale.set(1,1); //scales the virtual patient COMPONENT
        },

        onHotspots: function (collection) {
            // this is the callback function
            // this function scales and positions the hotspots based on db.json data


            collection.each(function (model) { // .each(function, this) <- Need this to this this context!
                var button = new ActionButton({
                    model: {
                        text: '',
                        color: 'red',
                        classes: ['hotspotbutton']
                    }
                });

                button.on('click', this.activateHotspot.bind(this, model));

                var x = model.get('x');
                var y = model.get('y');
                button.position.set(x, y);
                button.scale.set(.5, .5);
                this.add(button);

            }, this);

        },

        logPos: function (e) {
            var x = e.pageX; //mouse relative to page
            var y = e.pageY;
            var X = $(window).width(); //total page width/height $(this).width() also works?
            var Y = $(window).height();
            var relX =  x - X/2;
            var relY = -y + Y/2; //because we're flipping the Y vector also
            console.log(relX + ' ' + relY);

            // page basis: *--->
            //             |
            //             v

        },

        activateHotspot: function(model) {
            //alert('Hotspot activated: #' + model.get('id'));

            var thex = 256 + model.get('x');
            var they = 384 - model.get('y');
            var d    = $('.hotspawn'); //the psudothis dialogue

            //d.text('This is hotspot ' + model.get('id'));
            d.css('left', thex);
            d.css('top', they);
            d.is(':visible') ? d.hide() : d.show();
            d.css('z-index', '1000');

            d.html(model.get('data'));

            //;top:'+model.get('y')+'px');

        }


    });

});
