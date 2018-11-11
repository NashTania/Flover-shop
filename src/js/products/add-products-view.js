import ProductCollection from './products-collection.js';
import Product from './products-model.js';
import AbstractCollection from '../abstract/abstract-collection.js';

class AddView extends Backbone.View {
  constructor(options) {
    super(options)
    this.el = "#form";
    this.events = {
       'click .add-product-button':'addProduct'
   };
   this.productCollection = new ProductCollection();
   this.abstractCollection = new AbstractCollection();
   Backbone.View.apply(this);
  }

 addProduct( e ) {
    let product = new Product();
    product.set('id', $('#id-product').val());
    product.set('name', $('#name').val());
    product.set('type', $('#type-product').val());
    product.set('src', $('#src-product').val());
    product.set('price', $('#price-product').val());
    this.productCollection.loadPage().then((data) => {
      data.add(product);
      this.abstractCollection.addModel('tatiana_tkachenko_FD2_flover_shop_products', data)
    })
 }
}
export default AddView;
