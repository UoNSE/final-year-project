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
        // initialize: function (hotspots) {
            Component.prototype.initialize.apply(this, arguments);
            // this.hotspots = hotspots;

            // this.listenTo(hotspots, 'sync', this.createHotspots.bind(this));
            this.listenTo(this.collection.hotspots, 'sync', this.createHotspots.bind(this));
            // this.createHotspots(collection);
            //THE onHotspots() method ADDS THE HOTSPOTS
            //add a listener (listening to sync (backbone thing))
            //checks the collection has fully loaded

            this.collection.hotspots.fetch();
            //linking to the collection: { hotpots } key
            //if you dont call fecth(), the collection will always be empty (fetch calls ajax event under the hood)

            //button.position.set(100, 100);
            //button.rotation = Math.PI/4.; ----- this.scale.set(1,1); //scales the virtual patient COMPONENT
        },

        createHotspots: function (collection) {
            // this is the callback function
            // this function scales and positions the hotspots based on db.json data
            // var collection = this.hotspots;

            // issues.forEach(function (model, i) {
            //     var card = this.addIssue(new IssueModel({
			// 		width: this.width,
			// 		height: this.height,
			// 		title: 'Issue',
			// 		body: model.get('content'),
			// 		color: 'danger'
			// 	}));
            //     var scale = i - ((n - 1) / 2);
            //     card.position.set(-300, scale * (distance + card.model.get('height')));
            // }, this);


            // debugger;
                // this.hotspots.each(function(model, index, this) {
                collection.each(function (model) { // .each(function, this) <- Need this to be this context!
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
                //button.scale.set(.5, .5);
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
