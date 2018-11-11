import CartProduct from './cart-model.js';
import CartCollection from './cart-collection.js';
import AbstractCollection from '../abstract/abstract-collection.js';
import AbstractView from '../abstract/abstract-view.js';

class CartView extends AbstractView {

  constructor(options) {
    super(options)
      this.data = null;
      this.data = this.getTemplate('./src/js/cart/cart-template.html').then((tmp) => {
        this.template = _.template(tmp)
      })
      Backbone.View.apply(this);
  }
  tagName() { return "div"; }

  className() { return "flex-row";}

  render() {
    this.data.then(() => {
      this.$el.html(this.template(this.model.toJSON()));
    })
    return this;
  }
}

class CartListView extends Backbone.View {
  constructor(options) {
    super(options)
    this.el = '#cart-container';

    this.events = {
      'click .remove': 'removeCartProduct'
    },

    this.abstractCollection = new AbstractCollection();
    Backbone.View.apply(this);
  }

  initialize(initalCartProducts) {
    let cartCollection = new CartCollection();
    cartCollection.loadPage().then((data) => {
      this.collection = data;
      this.render();
      this.renderSum()
    })
  }

  render() {
    this.$el.empty();
    this.collection.each(function(item) {
      this.renderCartProduct(item)
    }, this);
  }

  renderCartProduct(item) {
    let cartViev = new CartView({model: item});


    this.$el.append(cartViev.render().el);
  }

  renderSum() {
    let total = this.getTotalSum();
    //$('#total').empty();
    $('#total').html('Итого: ' + total + ' руб.')
  }

  getTotalSum() {
    return this.collection.models.reduce((sum, product) => {
      return sum + product.get('price')
    }, 0)
  }

  removeCartProduct(e) {
    this.collection.remove(this.collection.get({id: e.target.dataset.id}))
    let userId = this.abstractCollection.getUserId();
    this.abstractCollection.sendData('tatiana_tkachenko_FD2_flover_shop_cart' + userId, this.collection)
    alert('товар удален')
    this.render()
  }
}

export default CartListView;
