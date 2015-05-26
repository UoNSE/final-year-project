define(function (require) {

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var template = Handlebars.compile(require('text!view/MyTemplate.html'));
	var model = new (require('model/MyModel'))();

	return Backbone.View.extend({
		className: 'item',
		template: template,
		model: model,
		initialize: function () {
			this.render();
		},
		render: function () {
			var html = this.template(this.model.toJSON());
			this.$el.html(html);
		}
	});

});
