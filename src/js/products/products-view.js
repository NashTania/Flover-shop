import ProductCollection, {productCollection} from './products-collection.js';


  let ProductView = Backbone.View.extend({
    tagName: 'div',
    className: 'card-popular',
    initialize: function(){
    this.template =  _.template($('#product-id').html())
  },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  })

  let GoodsView = Backbone.View.extend({
    el: '#flex-container',
    initialize: function(initalProducts) {
      let self = this;
      this.collection = new ProductCollection(initalProducts);
      this.collection.fetch({
        data: {
          f: 'READ',
          n: 'tatiana_tkachenko_FD2_flover_shop_products'
        },
        type: 'POST',
        success: function() {
          self.render();
        }
      })
    },
    render: function() {
      this.collection.each(function(item) {
        this.renderProduct(item);
      }, this);
    },
    renderProduct: function(item) {
      let productView = new ProductView({model: item});
      this.$el.append(productView.render().el);
    }
  })
  $(function() {
    new GoodsView(productCollection);
  });


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


export default GoodsView;
