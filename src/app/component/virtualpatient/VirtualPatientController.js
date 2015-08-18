define(function (require) {

    //TODO: make cards draggable
    //TODO: make hotspot from data

    var $ = require('jquery');
    var glm = require('glmatrix');
    var ViewController = require('controller/ViewController');
    var Animate = require('behaviour/Animate');
    var MultiTouchManager = require('behaviour/MultiTouchManager');
    var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');

    var styles = [
        'virtual-patient.css'
    ];

    return ViewController.extend({

        elements: $(),
        multitouch: MultiTouchManager.getInstance(),
        collection: 'Patients',
        styles: styles,
        selector: '#virtual-patient-img',


        events: {
            'click #context': '_onContext',
            'click #background': '_onBackground',
            'click #flip-patient-button': '_flipPatient',
            'click #question-patient-button': '_questionPatient',
            'click #test-request-button': '_testRequests',
            'click #test-results-button': '_testResults',
            'click #patients-chart-button': '_showPatientsChart',
            'click #hide-chart-button': '_hidePatientsChart',

        },
        _onAfterRender: function () {
            this._addItems();
        },

        _addItems: function () {
            //---------------------------------------------
            var transformableResources = [
                //'<div style="background-color:#00f;width:100px;height:100px"></div>',
                $('#patients-chart-table').get(), // //jquery fetch things
                $('#speech-card').get(),
                $('#observation-card2').get(),
                $('#observation-card3').get(),
                $('#observation-card4').get()
            ]; // [a,b,c...

            var transforms = [
                //[glm.vec3.fromValues(-300, 0, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0], //(translate,,) (scale,,)
                [glm.vec3.fromValues(300, 0, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0],

                [glm.vec3.fromValues(0, 300, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0],
                [glm.vec3.fromValues(100, 300, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0],
                [glm.vec3.fromValues(500, 300, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0],
                [glm.vec3.fromValues(-100, 300, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0]
            ];
            var numItems  = transformableResources.length;
            for (var i =0; i<numItems; i++) {
                var element = $(transformableResources[i]);
                element.addClass("abs-center").appendTo(this.$el);
                element.css('transform', transforms[i]);

                var multiTouchElement = this.multitouch.addElement(element);
                var behaviour = new RotateTranslateScaleBehaviour(multiTouchElement);
                multiTouchElement.addBehaviour(behaviour);
                glm.vec3.copy(behaviour.translation, transforms[i][0]);
                glm.vec3.copy(behaviour.scale, transforms[i][1]);
                glm.vec3.copy(behaviour.rotation, transforms[i][2]);
                behaviour.needsUpdate();
                this.elements = this.elements.add(element);
            }


        },

        _onReady: function () {
            this.listenTo(this.collection, 'add', this.render);
            //this.collection.add({name: 'New'});

            // draggables
            $('#patients-chart-table').draggable();
            //$('#virtual-patient-img-container').draggable();  //sample jquery method
            // $(".btn").draggable();


            $('#patients-chart-table').hide();
            $('#hide-chart-button').hide();

        },

        _flipPatient: function () {

            var virtual_patient_img = $('#virtual-patient-img');
            if (virtual_patient_img.attr("src") === "resources/images/androg.front.jpg") {
                virtual_patient_img.attr("src", "resources/images/androg.back.jpg");
            }
            else {
                virtual_patient_img.attr("src", "resources/images/androg.front.jpg");
            }

        },
        _showPatientsChart: function () {
            $('#patients-chart-table').show();
            $('#hide-chart-button').show();
            $('#patients-chart-button').hide();

        },

        _hidePatientsChart: function () {

            $('#patients-chart-table').hide();
            $('#hide-chart-button').hide();
            $('#patients-chart-button').show();

        },

        _questionPatient: function () {

            // TODO: explode options

        },
        _testRequests: function () {

            // TODO: explode options

        },
        _testResults: function () {

            // TODO: explode options

        }

    }); //end return function to send to viewController
});   //end require
