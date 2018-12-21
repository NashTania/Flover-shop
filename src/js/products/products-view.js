import ProductCollection from './products-collection.js';
import CartCollection from '../cart/cart-collection.js';
import Product from './products-model.js';
import AbstractCollection from '../abstract/abstract-collection.js';
import AbstractView from '../abstract/abstract-view.js';
import AddView from './add-products-view.js';


class ProductView extends AbstractView {

  constructor(options) {
    super(options)
    this.data = this.getTemplate('./src/js/products/shop-template.html').then((res) => {
      this.template = _.template(res)
    })
  }
  tagName() { return "div"; }

  className() { return "card-popular";}

  render() {
    this.data.then(() => {
      this.$el.html(this.template(this.model.toJSON()))
    })
    return this;
  }
}


class GoodsView extends Backbone.View {

  constructor(options) {
    super(options)
    this.el = '#flex-container';

    this.events = {
      'click .product-buy': 'addToCart'
    };

    this.abstractCollection = new AbstractCollection();
    this.cartCollection = new CartCollection();
    this.filterCollection = [];
    this._data = null;

    Backbone.View.apply(this);
  }


  initialize(initalProducts) {
    let productsCollection = new ProductCollection();
    let filterView = new FilterView();
    filterView.goodsView = this;
    productsCollection.loadPage().then((data) => {
      this._data = data;
      this.render()
    })
  }

  render() {
    this.$el.empty();
    if (this.filterCollection.length === 0) {
      this.collection = this._data;

    } else {
      this.collection = this._data.clone();
      this.collection.models = this.collection.models.filter((model) => {
        return this.filterCollection.indexOf(model.get('type')) !== -1
      })
    }

    this.collection.each(function(item) {
      this.renderProduct(item);
    }, this);
  }

  renderProduct(item) {
    let productView = new ProductView({
      model: item,

    });

    this.$el.append(productView.render().el);
  }

  addToCart(e) {
    console.log(this.abstractCollection.getUserId())
    let userId = this.abstractCollection.getUserId();
    this.cartCollection.loadPage().then((value) => {
      let cartProducts = value ? value : [];
      cartProducts.add(this.collection.get({id: e.target.dataset.id}));
      this.abstractCollection._data = value;
      this.abstractCollection.addModel('tatiana_tkachenko_FD2_flover_shop_cart_' + userId, cartProducts)
      alert('товар добавлен')
    })
  }
}

class FilterView extends Backbone.View {

  constructor(options) {
    super(options)
      this.el = '.filter';

      this.events = {
        'change input[type="checkbox"]': 'filterProducts'
      };

      this.goodsView = null;
      Backbone.View.apply(this);
    }

  filterProducts(e) {
    if (e.currentTarget.checked === true) {
      this.goodsView.filterCollection.push(e.currentTarget.id);
      this.goodsView.render()

    } else if (e.currentTarget.checked === false) {
      this.goodsView.filterCollection = this.goodsView.filterCollection.filter((id) => {
        return id != e.currentTarget.id
      })
      this.goodsView.render()
    }
  }
}
export default GoodsView;
