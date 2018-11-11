import AbstractView from './abstract-view.js';

class PageView extends AbstractView {

  constructor(options) {
    super(options)
    this.el = '#content';

    Backbone.View.apply(this);
  }

  render(tmp) {
    return this.getTemplate(tmp).then((template) => {
      this.$el.html(template)
    })
  }
}

export default PageView;
