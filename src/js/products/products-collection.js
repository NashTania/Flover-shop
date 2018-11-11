import Product from './products-model.js';

class ProductCollection extends Backbone.Collection {
  constructor(options) {
    super(options)

    this.model = Product;
    this.url = 'https://fe.it-academy.by/AjaxStringStorage2.php';
  }

  parse(data, options) {
    return JSON.parse(data.result)
  }

  loadPage() {
    return new Promise((resolve) => {
      if (this.models = []) {
        this.fetch({
          data: {
            f: 'READ',
            n: 'tatiana_tkachenko_FD2_flover_shop_products'
          },
          type: 'POST',
          success: (data) => {
            resolve(this)
          }
        })
      } else {
        resolve(this)

      }
    })
  }
};

export default ProductCollection;
