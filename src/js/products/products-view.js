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

/*let ProductView = AbstractView.extend({
  tagName: 'div',
  className: 'card-popular',
  data: null,

  initialize: function() {
    this.data = this.getTemplate('./src/js/products/shop-template.html').then((res) => {
      this.template = _.template(res)
    });
  },

  render: function() {
    this.data.then(() => {
      this.$el.html(this.template(this.model.toJSON()))
    })
    return this;
  }
})

let GoodsView = Backbone.View.extend({

  el: '#flex-container',

  events: {
    'click .product-buy': 'addToCart'
  },
  abstractCollection: new AbstractCollection(),
  cartCollection: new CartCollection(),
  productsCollection: new ProductCollection(),
  filterCollection: [],
  _data: null,

  initialize: function(initalProducts) {
    let filterView = new FilterView();
    filterView.goodsView = this;
    this.productsCollection.loadPage().then((data) => {
      this._data = data;
      this.render()
    })
  },

  render: function() {
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
  },

  renderProduct: function(item) {
    let productView = new ProductView({model: item});
    this.$el.append(productView.render().el);
  },

  addToCart: function(e) {
    let userId = this.abstractCollection.getUserId();
    this.cartCollection.loadPage().then((value) => {
      let cartProducts = value
        ? value
        : [];
      cartProducts.add(this.collection.get({id: e.target.dataset.id}));
      this.abstractCollection.sendData('tatiana_tkachenko_FD2_flover_shop_cart' + userId, cartProducts)
      alert('товар добавлен')
    })
  }
})

let FilterView = Backbone.View.extend({

  el: '.filter',

  events: {
    'change input[type="checkbox"]': 'filterProducts'
  },

  filterCollection: [],
  collectionProducts: [],
  goodsView: null,

  filterProducts: function(e) {
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
})
export default GoodsView;*/

/*  let products = [
  {
    'id': 1,
    'name': 'Shimmer And Shine',
    'type': 'bouquet',
    'src': './images/1b.jpg',
    'price': 23
  }, {
    'id': 2,
    'name': 'Happy Thoughts',
    'type': 'bouquet',
    'src': './images/2b.jpg',
    'price': 33
  }, {
    'id': 3,
    'name': 'Lovely In Blue',
    'type': 'bouquet',
    'src': './images/3b.jpg',
    'price': 23
  }, {
    'id': 4,
    'name': 'Brightness',
    'type': 'bouquet',
    'src': './images/4b.jpg',
    'price': 44
  }, {
    'id': 5,
    'name': 'Shimmer And Shine',
    'type': 'bouquet',
    'src': './images/5b.jpg',
    'price': 23
  }, {
    'id': 6,
    'name': 'Beautiful In White',
    'type': 'bouquet',
    'src': './images/6b.jpg',
    'price': 68
  }, {
    'id': 7,
    'name': 'Hudson Thoughts',
    'type': 'bouquet',
    'src': './images/7b.jpg',
    'price': 23
  }, {
    'id': 8,
    'name': 'Shimmer And Shine',
    'type': 'box',
    'src': './images/1box.jpg',
    'price': 56
  }, {
    'id': 9,
    'name': 'Sweet As Can Be',
    'type': 'box',
    'src': './images/2box.jpg',
    'price': 44
  }, {
    'id': 10,
    'name': 'Shimmer And Shine',
    'type': 'box',
    'src': './images/3box.jpg',
    'price': 48
  }, {
    'id': 11,
    'name': 'Romantic Trio',
    'type': 'wedding',
    'src': './images/1w.jpg',
    'price': 67
  }, {
    'id': 12,
    'name': 'Romantic Trio',
    'type': 'wedding',
    'src': './images/2w.jpg',
    'price': 50
  }, {
    'id': 13,
    'name': 'Romantic Trio',
    'type': 'wedding',
    'src': './images/3w.jpg',
    'price': 69
  }
];*/
