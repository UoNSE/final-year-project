define(function (require) {
    'use strict';

    var Component = require('core/Component');
    var template = require('text!component/activity/virtualpatient/patientbody/PatientBody.hbs'); //text!
    var ActionButton = require('component/actionbutton/ActionButton'); //referencing javascript file (require js)
    var Hotspots = require('collection/Hotspots'); //HotspotData from db.json, collections, model

    //Use Dylans module to retain consistency
    var Evidence = require('component/activity/issues/card/evidence/Evidence');
    var EvidenceModel = require('model/Evidence');

    return Component.extend({
        template: template,
        classes: ['patient-body'],
        styles: 'component/activity/virtualpatient/patientbody/PatientBody.css',
        collection: { //we say the component has a collection (collection of models)
            hotspots: new Hotspots() //, newCollection: new Newvalue()

        },
        events: {
            'click .vpb': 'logPos'
            //,'click .hotspawn': 'spawnHotspotEvidence'
        },

        initialize: function (params) {
            Component.prototype.initialize.apply(this, arguments); //initialise hotspots
            this.listenTo(this.collection.hotspots, 'sync', this.createHotspots.bind(this)); //this creates hotsposts and adds a listener to the hotspots
            this.collection.hotspots.fetch(); //checks the collection has fully loaded
            this.vproot = params.vproot;
            this.hotEvidence = {};
        },

        createHotspots: function (collection) { //this is the callback function

                collection.each(function (model) { // .each(function, this) <- Need this to be this context!
                var button = new ActionButton({
                    model: {
                        text: '',
                        color: 'red',
                        classes: ['hotspotbutton']
                    }
                });

                button.on('click', this.activateHotspot.bind(this, model)); //add listener
                var x = model.get('x');
                var y = model.get('y');
                button.position.set(x, y);
                this.add(button);
                this.spawnHotspotEvidence(model.get('id'), model.get('x'), model.get('y'), model.get('data'))

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

        spawnHotspotEvidence: function(evid, evx, evy, evcontent){
            //depracated code from addValue Testresults.js > addEvidencecar
            //var attribute = event.target.parentElement.parentElement;
            //var value = attribute.children.namedItem("value").innerHTML;

            var mywidth = 200;
            var myheight = 150;

            var evidenceCard = this.addEvidence(new EvidenceModel({//this is likely a backbone id, not a css id
                width: mywidth,
                height: myheight,
                title: 'Observation',
                color: 'info',
                body: evcontent
            }));

            this.hotEvidence[evid] = evidenceCard;

            evidenceCard.position.x = evx + mywidth/2.; //add a nice offset
            evidenceCard.position.y = evy - myheight/2.;

            //if(!$("#"+elid).length)
            this.vproot.add(evidenceCard); //we have to add the card to the root of the vitualpatient page
            evidenceCard.hide();
            //this.hotEvidence[model.get('id')].hide();

        },

        addEvidence: function (model) {
            var evidence = new Evidence({
                model: model
            });
            return evidence;
        },


        activateHotspot: function(model) {
            //var referenceclass = '.hotEvi' + model.get('id');
            //var dialogue = this.$(referenceclass);
            //dialogue.is(':visible') ? dialogue.hide() : dialogue.show();
            this.hotEvidence[model.get('id')].toggle();

            //this.spawnHotspotEvidence(model.get('id'), model.get('x'), model.get('y'), model.get('data'));
            //alert(referenceid)
            //alert('Hotspot activated: #' + model.get('id'));

            /* //Former
             var thex = 256 + model.get('x');
             var they = 384 - model.get('y');
             var d    = $('.hotspawn'); // the jquery DOM reference to the
                // d.text('This is hotspot ' + model.get('id'));
                d.css('left', thex);
                d.css('top', they);
                d.is(':visible') ? d.hide() : d.show();
                d.css('z-index', '1000');
                d.html(model.get('data'));
            */
            }


    });

});
