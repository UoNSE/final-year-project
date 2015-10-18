define(function (require) {

    'use strict';

    var Panel = require('component/panel/Panel');
    var template = require('text!component/activity/casebackground/card/caseinfo/CaseInfoCard.hbs');

    return Panel.extend({
        template:template,
        styles: 'component/activity/casebackground/card/caseinfo/CaseInfoCard.css',
        hiddenCards: null,
        textcounter:0,
        events : {
            'click .list-item' : 'selectListItem'
        },

        initialize: function () {
            Panel.prototype.initialize.apply(this, arguments);
            this.setInteractive();
            this.setDraggable({});
            this.hiddenCards = $('.hidden-info');
            this.total = this.model.get('total');
        },

        selectListItem: function (event) {
            var item = $(event.target);
            //if (!(item.hasClass('inv-list-item'))) {
            if (item.hasClass('selected-text')) {
                this.calcCounter(item,-1);
                //$("#list-" + item.attr('id')).remove();
            } else {
                this.calcCounter(item,1);
            }
            this.showHidden(item);
            /* inventory stuff
             } else {
             var id = item.attr('id');
             item.remove();
             item = $("#" + (id.slice(5, id.length)));
             }
             */
            item.toggleClass('selected-text');
        },

        calcCounter: function (text,amount){
            if ((text.attr('issue')) != null && (text.attr('issue')) != undefined) {
                this.textcounter += amount
            } else {
                this.textcounter -= amount;
            }
            console.log("count: " + this.textcounter);
            console.log("total: " + this.total);
        },

        showHidden: function (){
            let that = this;
            $('.hidden-info').each(function () {
                if (($(this).attr('threshold')) <= that.textcounter) {
                    $(this).removeClass('.hidden-info').fadeIn(2500);
                }
            });
            if (that.textcounter === this.total){
                that.hiddenHint.show();
                that.hiddenLink.show();
            }
        },

    });

});