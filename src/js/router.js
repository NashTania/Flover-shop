import GoodsView from './products/products-view.js';
import ProductCollection from './products/products-collection.js';
import AbstractView from './abstract/abstract-view.js';
import CartListView from '../js/cart/cart-view.js';
import PageView from './abstract/page-view.js';
import AddView from './products/add-products-view.js';

class Router extends Backbone.Router {
  constructor(options) {
    super(options)
      this.routes = {
        '': 'main',
        'main': 'main',
        'about': 'about',
        'gallery': 'gallery',
        'shop': 'shop',
        'cart': 'cart',
        'add-products': 'addProducts'
      }
    Backbone.Router.apply(this);
}

  main() {
    let mainView = new PageView();
    mainView.render('./src/js/common/main-page.html')
  }

  about() {
    let aboutView = new PageView();
    aboutView.render('./src/js/common/about-page.html')
  }

  gallery() {
    let galleryView = new PageView();
    galleryView.render('./src/js/common/gallery-page.html')
  }

  shop() {
    let shopView = new PageView();
    shopView.render('./src/js/products/shop-page.html').then(() => {
      let productsView = new GoodsView();
    })
  }

  cart() {
    let cartViev = new PageView();
    cartViev.render('./src/js/cart/cart-page.html').then(() => {
      let cartView = new CartListView()
    })
  }

  addProducts() {
    let addView = new PageView();
    addView.render('./src/js/products/add-products.html').then(() => {
      let addView = new AddView();
    })
  }

}
let router = new Router();

$(document).ready(() => Backbone.history.start());

export default router;
