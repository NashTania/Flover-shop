import Product from './products-model.js';

const ProductCollection = Backbone.Collection.extend({
  parse(data, options) {
    return JSON.parse(data.result)
  },
  model: Product,
  url: 'https://fe.it-academy.by/AjaxStringStorage2.php'
});

export const productCollection = new ProductCollection();
productCollection.fetch({
  data: {
    f: 'READ',
    n: 'tatiana_tkachenko_FD2_flover_shop_products'
  },
  type: 'POST'
})

export default ProductCollection;
