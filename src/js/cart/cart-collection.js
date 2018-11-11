import CartProduct from './cart-model.js';
import AbstractCollection from '../abstract/abstract-collection.js';

class CartCollection extends Backbone.Collection {
  constructor(options) {
    super(options);
    this.model = CartProduct;
    this.url = 'https://fe.it-academy.by/AjaxStringStorage2.php';
    this.abstractCollection = new AbstractCollection();
    this._data = null;
}
  parse(data, options) {
    if (data.result) {
      return JSON.parse(data.result)
    }
    return
  }

  loadPage() {
    let userId = this.abstractCollection.getUserId();
    return new Promise((resolve) => {
      this.fetch({
        data: {
          f: 'READ',
          n: 'tatiana_tkachenko_FD2_flover_shop_cart_' + userId
        },
        type: 'POST',
        success: (data) => {
          resolve(this)
        }
      })
    })
  }
};

export default CartCollection;
