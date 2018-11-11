import Product from '../products/products-model.js';

class AbstractCollection extends Backbone.Collection {
  constructor(options){
    super(options)
    this.model = Product;
    this.url = 'https://fe.it-academy.by/AjaxStringStorage2.php';
    this._data = null;
    Backbone.Collection.apply(this);
}

  addModel(key, value) {
    Backbone.sync('create', this,{
      data: $.param({
        f: 'READ',
        n: key
      }),
      success:(data) => {
      console.log(this._data)
        if (data.result) {
          Backbone.sync('create', this,{
            data: $.param({
              f: 'LOCKGET',
              n: key,
              p: '111'
            }),
            success:() => {
              console.log('2');
              Backbone.sync('create', this, {
                data: $.param({
                  f: 'UPDATE',
                  n: key,
                  p: '111',
                  v: JSON.stringify(value)
                })
              })
            }
          })
        } else {
          Backbone.sync('create', this, {
            data: $.param({
              f: 'INSERT',
              n: key,
              v: JSON.stringify(value)
            }),
            success: () => {
              console.log('3');
            }
          })
        }
      }
    })
  }

  makeId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  getUserId() {
    //localStorage.clear('tatiana_tkachenko_FD2_flover_cart_products')
    let userId = localStorage.getItem('tatiana_tkachenko_FD2_flover_cart_products');
    if (!userId) {
      userId = this.makeId();
      localStorage.setItem('tatiana_tkachenko_FD2_flover_cart_products', userId);
    }
    return userId;
  }
}
export default AbstractCollection;
