// TODO: move module into activity folder as per http://wiki.uonse.org/display/FYP/2015/08/16/Creating+an+Activity
//TODO: on hover event when evidence cards (observations/responses)
//      are dragged onto save evidence button.
// TODO: save evidence to JSON.
// TODO: convert current demo format into backbones format with models and subviews.
//TODO: hide opened menus when another menu is opened.
//TODO: fix charts showing up at start (should be hidden by default).
//      onready calls dont seem to be working atm. were pre-brendans demo,
//       am guessing this was to optimise the demo,
//       but am not sure atm how to restore.
//TODO: make hotspot from data
// TODO: change hide-chart when opened to keep button there but change text to
// hide chart as it is more consistent with other buttons.

define(function(require){

    var $ = require('jquery');

    // the virtual patient view
    var template = require('text!component/virtualpatient/VirtualPatientView.html');

    // collections
    var Patients = require('collection/Patients');
    var Questions = require('collection/TestTypes');
    var TestTypes = require('collection/TestTypes');

    // controllers
    var ViewController = require('controller/ViewController');
    var TestMenuController = require('controller/TestsMenuController');
    var QuestionsMenuController = require('controller/TestsMenuController');

    // behaviours
    var glm = require('glmatrix');
    var MultiTouchManager = require('behaviour/MultiTouchManager');
    var DraggableBehaviour = require('behaviour/DraggableBehaviour');
    var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');

    // class variables
    var numEventCardsShowingInFeed = 0;
    var eventCardFeedQueue = ["#observation-card1", "#observation-card2", "#observation-card3", "#speech-card1","#speech-card2"]; // ,"#dummy-card1", "#dummy-card2","#dummy-card3", "#dummy-card4"
    var feedCardSchedule = [1000,2000,3000,4000,5000]; //, 6000, 7000, 8000, 9000
    var cardsDisplayedList = [];


    return ViewController.extend({

    template: template,
    collection: {
        patients: new Patients(),
        questions: new Questions(),
        testtypes: new TestTypes(),
    },
    multitouch: MultiTouchManager.getInstance(),
    // collection: 'Patients',
    styles: 'virtual-patient.css',
    selector: '#virtual-patient-img',


    events: {
        'click #context': '_onContext', /* @TODO: delete most of these (depracated) */
        'click #background': '_onBackground',
        'dblclick #virtual-patient-img-container': '_flipPatient',
        // 'click #flip-patient-button': '_flipPatient',
        'click #test-results-button': '_testResults',
        'click #hide-chart-button': '_hidePatientsChart',
        'click #query-card': '_queryCard',
        'click #test-card1': '_showUrineAnalysisChart',
        'click #hide-chart-button2': '_hideUrineAnalysisChart',
        'click #button-query': '_queryPatient',
        'click #button-tests': '_testPatient',
        'click #button-chart': '_showPatientsChart',
        'click #test-card3': '_showSubMenu',
        'click #test-card4': '_showTarget',
        'click #test-card5': '_showTarget',
        'click .hotspot': '_hotSpotClick'
        // 'click .menu-item': '_menuItemSelection'
        },

        initialize: function () {
          ViewController.prototype.initialize.apply(this, arguments);

          var patients = this.collection.patients;
          var questions = this.collection.questions;
          var testtypes = this.collection.testtypes;

          this.listenTo(patients, 'sync', this.onSync);
          patients.fetch();
          this.listenTo(questions, 'sync', this.onSync);
          questions.fetch();
          this.listenTo(testtypes, 'sync', this.onSync);
          testtypes.fetch();
          this.render();
        },

        onSync: function (collection) {
          // TODO
        },

        onAfterRender: function () {
        //   this.listenTo(this.collection, 'add', this.render);
          //this.collection.add({name: 'New'});
          this._transformItems();
          this._hideElements();
          this._startEventFeed();
        },

        // everything should have loaded. Add Model and Collection event handling here.
        // onReady: function () {
        //     this.listenTo(this.collection, 'add', this.render);
        //     //this.collection.add({name: 'New'});
        //     alert("hello world");
        //     this._hideElements();
        //     this._startEventFeed();
        // },

        _hideElements: function() {
            $('#patients-chart-table').hide();
            $('#urine-analysis-results').hide();
            $('#hide-chart-button').hide();
            $('.observation-card').hide();
            $('.speech-card').hide();
            $('#query-menu').hide();
            $('#test-menu').hide();
            // $('.button-menu').hide();
            $('#test-menu-container2').hide();
            $('#target').hide();
        },

        // callback to offset cards already shown.
        _offsetDisplayedCards: function(passedCardsDisplayList){
            // here the list is not defined.
            console.log("passedCardsDisplayList: "+passedCardsDisplayList);
            // before showing another card,
            // offset down every card already shown
            for (var i = 0; i < numEventCardsShowingInFeed; i++){
            // for (cardDisplayedId in passedCardsDisplayList){
                var cardDisplayedId =  passedCardsDisplayList[i]
                // console.log("this displayed card's id is: "+passedCardsDisplayList[i]);
                console.log("this displayed card's id is: "+cardDisplayedId);
                // var cardHeight = $(".generic-card").height();
                var cardHeight = 200;
                if (cardDisplayedId != null){
                    var topOffset = $(cardDisplayedId).offset().top;

                    console.log("cards showing in feed: "+numEventCardsShowingInFeed);
                    // $(cardDisplayedId).offset({top:cardHeight*numEventCardsShowingInFeed*-1});
                    console.log("displayedCard's top offset is: "+topOffset);
                    $(cardDisplayedId).offset({top: topOffset + cardHeight *1});
                }
            }
        },

        //add new card
        _addNewCard: function(i, thisCardId, offsetCardsCallback){

            setTimeout(function(){

            // before adding new card, offset already showing cards.
            if (typeof(offsetCardsCallback) === "function"){

                // copy the list and pass it to the callback.
                var passedCardsDisplayList = cardsDisplayedList.slice();
                offsetCardsCallback(passedCardsDisplayList);
            }

            // show the new card
            $(thisCardId).show();

            // add this card to the cardsDisplayedList.
            cardsDisplayedList.push(thisCardId);

            // here the list is defined
            console.log("cardsDisplayedList: "+cardsDisplayedList);

            // increment event cards showed counter
            numEventCardsShowingInFeed++;

            }, feedCardSchedule[i]);

        },

        _startEventFeed: function() {

            var numEventCards = eventCardFeedQueue.length;
            console.log("num of event cards in queue: "+numEventCards);

            // while there are still feed item / event cards unshown,
            // progressively show them as per the hardcoded schedule.
            // will eventually depend on JSON data.
            // TODO: replace hardcoded schedule with JSON.

            // while(eventFeedCardQueue.length > 0){

            // loop through card queue
            for (var i = 0; i < numEventCards; i++) {

                // console.log("#"+eventCardFeedQueue[i]);
                var thisCardId = eventCardFeedQueue[i];
                console.log(thisCardId);

                // a reference to the callback
                var offsetCardsCallback = this._offsetDisplayedCards;

                this._addNewCard(i, thisCardId, offsetCardsCallback);
                if($(thisCardId).is(":visible")){
                    console.log(thisCardId + " is visible");
                }
            } // end card loop
        }, // end feed function,

        _transformItems: function () {
            //---------------------------------------------
            var transformableResources = [
                //'<div style="background-color:#00f;width:100px;height:100px"></div>',
                $('#speech-card1').get(),
                $('#speech-card2').get(),

                $('#observation-card1').get(),
                $('#observation-card2').get(),
                $('#observation-card3').get(),

                //$('#dummy-card1').get(),
                //$('#dummy-card2').get(),
                //$('#dummy-card3').get(),
                //$('#dummy-card4').get(),


                // we might need to change it back to this later.
                // atm were translating containers cos i wasnt sure how to
                // transform both the button and menu at once.
                // this is a hack with a bug -
                // ie. you can drag around the container.

                // $('#button-chart').get(),
                // $('#button-query').get(),
                // $('#button-tests').get(),

                //$('#virtual-patient-img-container').get(),
                $('#patients-chart-container').get(), // //jquery fetch things
                $('#query-menu-container').get(),
                $('#test-menu-container').get(),
                $('#urine-analysis-results').get()
            ];

            var transforms = [
                [glm.vec3.fromValues(-420, -300, 0),   glm.vec3.fromValues( .25,.25, 1), 0], //(translate,,) (scale,,)
                [glm.vec3.fromValues(-420, -300, 0),   glm.vec3.fromValues( .25,.25, 1), 0],

                [glm.vec3.fromValues(-420, -300, 0), glm.vec3.fromValues(.25,.25, 1), 0],
                [glm.vec3.fromValues(-420, -300, 0), glm.vec3.fromValues(.25,.25, 1), 0],
                [glm.vec3.fromValues(-420, -300, 0),glm.vec3.fromValues(.25,.25, 1), 0],

                //[glm.vec3.fromValues(-420, -300, 0), glm.vec3.fromValues(.25,.25, 1), 0],
                //[glm.vec3.fromValues(-420, -300, 0), glm.vec3.fromValues(.25,.25, 1), 0],
                //[glm.vec3.fromValues(-420, -300, 0),glm.vec3.fromValues(.25,.25, 1), 0],
                //[glm.vec3.fromValues(-420, -300, 0),glm.vec3.fromValues(.25,.25, 1), 0],


                // [glm.vec3.fromValues(-430, 300, 0),   glm.vec3.fromValues( 1.0,1.0, 1), 0],
                // [glm.vec3.fromValues(-330, 300, 0),   glm.vec3.fromValues( 1.0,1.0, 1), 0],
                // [glm.vec3.fromValues(-230, 300, 0),   glm.vec3.fromValues( 1.0,1.0, 1), 0],

                //[glm.vec3.fromValues(0, 0, 0),glm.vec3.fromValues(2.5,2.5, 1), 0],
                [glm.vec3.fromValues(170, 500, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0],
                [glm.vec3.fromValues(170, 500, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0],
                [glm.vec3.fromValues(170, 500, 0), glm.vec3.fromValues(1.0,1.0, 1), 0],
                [glm.vec3.fromValues(0, 0, 0), glm.vec3.fromValues(1.0,1.0, 1), 0]

            ];
            var numItems  = transformableResources.length;
            for (var i =0; i<numItems; i++) {
                var element = $(transformableResources[i]);
                element.addClass("abs-center").appendTo(this.$el);
                element.css('transform', transforms[i]);

                // MultiTouchManager.addElementRTS(element);
                // var draggableMTelement = MultiTouchManager.addElementDraggable(element);
                // this.bindDraggableEvents(draggableMTelement);

                var multiTouchElement = this.multitouch.addElement(element);
                var behaviour = new RotateTranslateScaleBehaviour(multiTouchElement);
                multiTouchElement.addBehaviour(behaviour);

                glm.vec3.copy(behaviour.translation, transforms[i][0]);
                glm.vec3.copy(behaviour.scale, transforms[i][1]);
                glm.vec3.copy(behaviour.rotation, transforms[i][2]);
                behaviour.needsUpdate();
                // this.elements = this.elements.add(element);
            }


        },

        _flipPatient: function () {

            var virtual_patient_img_container = $('#virtual-patient-img-container');
            // if (virtual_patient_img.attr("src") === "resources/images/androg.front.jpg") {
            //     virtual_patient_img.attr("src", "resources/images/androg.back.jpg");
            // }
            // else {
            //     virtual_patient_img.attr("src", "resources/images/androg.front.jpg");
            // }
            if (virtual_patient_img_container.attr("background-image") === "resources/images/androg.front.jpg") {
                virtual_patient_img.attr("background-image", "resources/images/androg.back.jpg");
            }
            else {
                virtual_patient_img.attr("background-image", "resources/images/androg.front.jpg");
            }

        },
        _showPatientsChart: function () {
            $('#patients-chart-table').show();
            $('#hide-chart-button').show();
            $('#patients-chart-button').hide();

        },


    _hidePatientsChart: function() {

            $('#patients-chart-table').hide();
            $('#hide-chart-button').hide();
            $('#patients-chart-button').show();

        },

    _showUrineAnalysisChart: function() {

      $('#urine-analysis-results').show();
      $('#hide-chart-button2').show();

    },

    _hideUrineAnalysisChart: function() {

      $('#urine-analysis-results').hide();
      $('#hide-chart-button2').hide();

    },

    // hideOtherMenus()

    _queryPatient: function () {

        if($('#query-menu').is(":visible")){
            $('#query-menu').hide();

        }else{
            $('#query-menu').show();

        }

        // // should be replaced with this._offsetMenu();
        // $('.button-menu').each(function() {
        //     //get number of menu items
        //     // var numMenuItems = $( this ).find('.menu-item').length;
        //     // console.log(numMenuItems);
        //     // // get height of menu item.
        //     // var menuItemHeight = $( this ).children('button').css('height')
        //     // console.log(menuItemHeight);
        //     // // calculate height of menu
        //     // var menuHeight = numMenuItems * menuItemHeight;
        //     // console.log(menuHeight);
        //     menuHeight = 500;
        //     $(this).offset({top:menuHeight});
        //
        // });
    },

    _testPatient: function () {

    if($('#test-menu').is(":visible")){
        $('#test-menu').hide();

    }else{
        $('#test-menu').show();

    }
        // should be replaced with this._offsetMenu();
        $('.button-menu').each(function() {
            // //get number of menu items
            // var numMenuItems = $( this ).find('.menu-item').length;
            // console.log(numMenuItems);
            // // get height of menu item.
            // var menuItemHeight = $( this ).children('button').css('height')
            // console.log(menuItemHeight);
            // // calculate height of menu
            // var menuHeight = numMenuItems * menuItemHeight;
            // console.log(menuHeight);

            // menuHeight = 500;
            // $(this).offset({top:menuHeight});

        });

    },

    _offsetMenu: function (){
        //position the menu based on how big it is (how many items)
        // num.elements * size.element (menu-item)
        // TODO: fix this.
        // $('.button-menu').each(function() {
            // get number of menu items
            // var numMenuItems = $( this ).find('.menu-item').length;
            // console.log(numMenuItems);
            // // get height of menu item.
            // var menuItemHeight = $( this ).children('button').css('height')
            // console.log(menuItemHeight);
            // // calculate height of menu
            // var menuHeight = numMenuItems * menuItemHeight;
            // console.log(menuHeight);
        //     menuHeight = 500;
        //     $(this).offset({top:menuHeight});
        //
        // });
    },

    // _menuItemSelection: function(){
    //     var id = this.id;
    //     // console.log(this);
    //
    //     console.log(id);
    //     $(id).css("background-color","orange");
    //
    // }

    _showSubMenu: function(){
        // get the sub-menu below and show
        // here we just show the blood sub menu for demo
        // $('#test-menu-container2').show();

        if($('#test-menu-container2').is(":visible")){
            $('#test-menu-container2').hide();

        }else{
            $('#test-menu-container2').show();

        }

    },

      _hotSpotClick: function(){
        alert('Hotspot Activated!');
      },

    //TODO: if submenu is expanded. when menu item clicked again, collapse it.

    _showTarget: function(){
        //TODO: make target more unique, like a crosshair maybe.
        //TODO: make target transformable.
        //TODO: make crosshair disappear when another menu item selected or
        // button collapsed or other element selected.
        // basically on any click event other than selecting the scan area.

        // if xray or ctscan is picked. then show target on virtual patient
        // of where the scan will be done. (circle area).
        $("#target").show();
    }

  });
});
