// import cart from '../data/cart.js';
import boxes from '../data/boxes.js';
import { findById, cartTotal } from '../common/utils.js';
import renderLineItem from './render-line-item.js';
import { getCart, clearCart } from '../common/cart-api.js';

const orderButton = document.getElementById('placeOrder');

const cart = getCart();
if (cart.length === 0) orderButton.disabled = 'disabled';

const tbody = document.getElementById('cart-body');
const orderTotalCell = document.getElementById('orderTotal');
const usd = (currency) => '$' + (Math.round(currency * 100) / 100).toFixed(2);

cart.forEach(cartItem => {
    const box = findById(cartItem.id, boxes);
    const lineItem = renderLineItem(cartItem, box);
    tbody.appendChild(lineItem);
});

const orderTotal = cartTotal(cart, boxes);
orderTotalCell.textContent = usd(orderTotal);

orderButton.addEventListener('click', () => {
    alert(JSON.stringify(cart, true, 2));
    clearCart();
    window.location = '../';
});