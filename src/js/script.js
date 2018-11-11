//tatiana_tkachenko_FD2_flover_shop_products'
//https://fe.it-academy.by/AjaxStringStorage2.php
/*$(document).ready(function() {
  $('#order-button').click(function() {
    sendRequest('tatiana_tkachenko_FD2_flover_shop_cart', cartProducts)
    console.log('send')
  })
})*/
import $ from 'jquery';
import Backbone from 'backbone';
import Underscore from 'underscore';
import css from '../css/styles.css';
import styles from '../css/style.scss';
import CartProduct from '../js/cart/cart-model.js';
import CartListView from '../js/cart/cart-view.js';
import CartCollection from '../js/cart/cart-collection.js';
import productCollection from '../js/products/products-collection.js';
import ProductCollection from '../js/products/products-collection.js';
import Product from './products/products-model.js';
import GoodsView from './products/products-view.js';
import router from './router.js';
import AbstractView from '../js/abstract/abstract-view.js';
import AbstractCollection from '../js/abstract/abstract-collection.js'
import PageView from './abstract/page-view.js';
import AddView from '../js/products/add-products-view.js';
