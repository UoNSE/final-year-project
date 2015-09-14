define(function (require) {
    'use strict';

    var Component = require('core/Component');

    return Component.extend({

        events: {
            'click .list-item': 'selectListItem'
        },

        selectListItem: function (event) {
            var item = $(event.target);

            if (!(item.hasClass('inv-list-item'))) {
                if (item.hasClass('selected-text')) {
                    $("#list-" + item.attr('id')).remove();
                } else {
                    item.clone().attr('id', 'list-' + item.attr('id')).addClass('inv-list-item well').css('box-shadow', '-3px 1px 6px 0 rgba(0,0,0,0.12)').appendTo($('.cpn-inventory').find('.panel-body'));
                }
            } else {
                var id = item.attr('id');
                item.remove();
                item = $("#" + (id.slice(5, id.length)));
            }
            item.toggleClass('selected-text');
        }
    });
});