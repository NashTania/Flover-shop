const CartProduct = Backbone.Model.extend({
  defaults: {
    id: 1,
    name: 'Shimmer And Shine',
    type: 'bouquet',
    src: '1b.jpg',
    price: 23
  }
})


export default CartProduct;
