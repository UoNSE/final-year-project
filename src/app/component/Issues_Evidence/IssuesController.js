define(function (require) {

    'use strict';

    var $ = require('jquery');

    var ViewController = require('controller/ViewController');
    var Animate = require('behaviour/Animate').getInstance();

    var Issues = require('collection/Issues');
    var Evidence = require('collection/Evidence');

    var IssueViewController = require('component/Issues_Evidence/issue/IssueController');
    var EvidenceViewController = require('component/Issues_Evidence/evidence/EvidenceController');

    var MultiTouchManager = require('behaviour/MultiTouchManager').getInstance();
    var DraggableBehaviour = require('behaviour/DraggableBehaviour');

    return ViewController.extend({

        styles: 'issues-evidence.css',
        menu: null,
        deleteCard: null,
        splitCard: null,

        events: {
            'mouseover #btn-delete': 'onDeleteMouseOver',
            'mouseover #btn-split': 'onSplitMouseOver',
            'mouseleave #btn-delete': 'onDeleteMouseLeave',
            'mouseleave #btn-split': 'onSplitMouseLeave'
        },

        collection: {
            issues: new Issues(),
            evidence: new Evidence()
        },

        initialize: function () {

            ViewController.prototype.initialize.apply(this, arguments);

            this.listenTo(this.collection.issues, 'sync', this.onIssuesSync);
            this.listenTo(this.collection.evidence, 'sync', this.onEvidenceSync);

            this.collection.issues.fetch();
            this.collection.evidence.fetch();

            this.deleteCard = false;
            this.splitCard = false;

        },

        onIssuesSync: function (issues) {
            // TODO clean up
            issues.forEach(function (issue) {
                var view = this.addNestedView('#issues', new IssueViewController({
                    model: issue
                }));
                MultiTouchManager.addElementRTS(view.el);
                var element = MultiTouchManager.addElementDraggable(view.el);
                this.bindDraggableEvents(element);
            }.bind(this));

            this.listenTo(issues, 'add', this.render);
            //this.render();
        },

        onEvidenceSync: function (evidence) {
            evidence.forEach(function (evidence) {
                var view = this.addNestedView('#evidence', new EvidenceViewController({
                    model: evidence
                }));
                MultiTouchManager.addElementRTS(view.el);
                var element = MultiTouchManager.addElementDraggable(view.el);
                this.bindDraggableEvents(element);
            }.bind(this));

            this.listenTo(evidence, 'add', this.render);
            //this.render();
        },

        bindDraggableEvents: function (element) {
            $(element).on({
                drag: this.onDrag.bind(this),
                drop: this.onDrop.bind(this)
            });
        },

        onDrag: function () {
            this.menu.toggleClass('hidden', false);
        },

        onDrop: function (event) {
            var multiTouchElement = event.currentTarget;
            var $card = multiTouchElement.element;
            if (this.deleteCard) {
                $card.remove();
            }
        },

        onAfterRender: function () {

            this.menu = $('#menu');

            var issues = this.$el.find('#issues').children();
            var evidence = this.$el.find('#evidence').children();

            var viewport = $(window);

            issues.each(function (index, card) {
                var $card = $(card);
                var left = (viewport.width() * 0.5) - ($card.width() * 0.5);
                var top = (viewport.height() * 0.5) - ($card.height() * 0.5);
                Animate.scale($card, {
                    delay: index * 50,
                    animate: {
                        left: left,
                        top: top
                    }
                });
            });

            evidence.each(function (index, card) {
                var $card = $(card);
                var left = (viewport.width() * 0.5) - ($card.width() * 0.5);
                var top = (viewport.height() * 0.5) - ($card.height() * 0.5);
                Animate.scale($card, {
                    delay: index * 50,
                    animate: {
                        left: left,
                        top: top
                    }
                });
            });

        },


        onDragEnd: function (event) {
            var $card = $(event.currentTarget);
            var position = $card.offset();
            var deleteButton = $("#btn-delete");
            var splitButton = $("#btn-split");

            debugger;

            if (this.splitCard) {

            }

            //check for card deletion
            //if(this.touchOverElement(delbtn,event) ){
            //}
            //else if (this.touchOverElement(splitButton, event) ){
            //
            //    if ( !target.hasClass("merged") ){
            //        return;
            //    }
            //
            //    var children = target.children(".panel-body");
            //
            //    //check for blank lines
            //    var resultstring = "";
            //    for (var n=0;n<children.text().split("\n").length;n++){
            //        if(!children.text().split("\n")[n].trim()==" "){
            //            resultstring += children.text().split("\n")[n].trim()+"\n"
            //        }
            //    }
            //
            //    //create the respective issue & evidence
            //    $("#issues").append( createCard( "Issue", resultstring.split("\n")[0] ) );
            //    //create evidence cards
            //    var n = 1;
            //    while (resultstring.split("\n")[n]!= ""){
            //        $("#evidences").append(createCard("Evidence", resultstring.split("\n")[n]));
            //        n++;
            //    }
            //
            //    //delete the pair
            //    $card.remove();
            //
            //    //add RTS
            //    var list = $("#issues").children();
            //    for(var i=0; i<list.length;i++){
            //        var card = list[i];
            //        multiTouchManager.addElementRTS(card);
            //    }
            //
            //    //add RTS
            //    var list = $("#evidence").children();
            //    for(var i=0; i<list.length;i++){
            //        var card = list[i];
            //        multiTouchManager.addElementRTS(card);
            //    }
            //}
            //else {
            //    //check for card merging
            //
            //    var list;
            //    if (target.hasClass("issue")) {
            //        list = $('#evidence').children();
            //    }
            //    else {
            //        //check all issue cards
            //        list = $('#issues').children();
            //    }
            //    for (var i = 0; i < list.length; i++) {
            //        //div
            //        var card = $(list[i]);
            //       // if (!card.hasClass("merged")) {
            //
            //            if ( touchOverElement(card,event) ){
            //
            //
            //                var issue;
            //                var evidence;
            //
            //                //update card text
            //                if (target.hasClass("issue")) {
            //                    issue = target;
            //                    evidence = card;
            //                }
            //                else {
            //                    issue = card;
            //                    evidence = target;
            //                }
            //
            //                evidence.children().each( function() {
            //                    issue.append( this );
            //                });
            //
            //                issue.removeClass("panel-info");
            //                issue.addClass("panel-success");
            //                //add "merged" class to div
            //                issue.addClass("merged");
            //
            //                //This is dirty, I know
            //                issue.height( (issue.text().split("\n").length) * 22 - 75);
            //
            //                //remove old card
            //                evidence.remove();
            //
            //                break;
            //            }
            //        //}
            //    }
            //}

            this.menu.toggleClass('hidden', true);

        },

        onDeleteMouseOver: function (event) {
            // TODO do in nicer way
            var button = $(event.currentTarget);
            button.removeClass('btn-material-yellow').addClass('btn-material-orange btn-material-yellow');
            console.log('delete');
            this.deleteCard = true;
        },

        onSplitMouseOver: function (event) {
            var button = $(event.currentTarget);
            button.removeClass('btn-material-yellow').addClass('btn-material-orange btn-material-yellow');
            this.splitCard = true;
        },

        onDeleteMouseLeave: function (event) {
            var button = $(event.currentTarget);
            button.removeClass('btn-material-orange');
            console.log('no delete');
            this.deleteCard = false;

        },

        onSplitMouseLeave: function (event) {
            var button = $(event.currentTarget);
            button.removeClass('btn-material-orange');
            this.splitCard = false;
        },

        createCard: function (cardType, content) {
			var panelType =  ( cardType === "Issue" ) ? "info" : "danger";
			return "<div class='panel panel-" + panelType + " abs-center "+cardType.toLowerCase()+" card' style='width: 300px; height: 100px'>"+"\n"+"<div class='panel-heading'>"+"\n"+"<h3 class='panel-title'>" + cardType + "</h3>"+"\n"+"</div>"+"\n"+"<div class='panel-body'>" +"\n"+ content +"\n"+ "</div>"+"\n"+"</div>";
		}

    });


});