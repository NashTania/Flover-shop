import CartProduct from './cart-model.js'
import CartCollection from './cart-collection.js'

const cartProducts = [
  {
    'id': 1,
    'name': 'Shimmer And Shine',
    'type': 'bouquet',
    'src': '1b.jpg',
    'price': 23
  }, {
    'id': 2,
    'name': 'Happy Thoughts',
    'type': 'bouquet',
    'src': '2b.jpg',
    'price': 33
  }, {
    'id': 3,
    'name': 'Lovely In Blue',
    'type': 'bouquet',
    'src': '3b.jpg',
    'price': 23
  }
]


   let CartView = Backbone.View.extend({
    tagName: 'div',
    className: 'flex-row',
    initialize: function(){
      this.template = _.template($('#cart-id').html())
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  })


let CartList = Backbone.View.extend({
  el: '#cart-container',
  initialize: function(initalCartProducts) {
    this.collection = new CartCollection(initalCartProducts);
    this.render();
  },
  render: function() {
    this.collection.each(function(item) {
      this.renderCartProduct(item)
    }, this);
  },
  renderCartProduct: function(item) {
    let cartViev = new CartView({model: item});
    this.$el.append(cartViev.render().el);
  }
})
$(function() {
  new CartList(cartProducts)
})

export default CartList;
