import CartProduct from './cart-model.js';

let CartCollection = Backbone.Collection.extend({
  model: CartProduct
});


export default CartCollection;
