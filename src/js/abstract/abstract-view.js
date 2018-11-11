
let _templateCache = {}


class AbstractView extends Backbone.View {
  constructor(options) {
    super(options)
    this.el = null;

    Backbone.View.apply(this);
  }

  getTemplate(tmp){
    if(_templateCache[tmp] === undefined){
      return new Promise((resolve) => {
        $.get(tmp, (template) => {
          _templateCache[tmp] = template;
          resolve(_templateCache[tmp])
        })
      })
    }
    return new Promise((resolve) => {
      resolve(_templateCache[tmp])
    })
  }

}

export default AbstractView;
