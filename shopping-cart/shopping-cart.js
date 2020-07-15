import cart from '../data/cart.js';
import boxes from '../data/boxes.js';
import findById, { cartTotal } from '../common/utils.js';
import renderLineItem from './render-line-item.js';

const tbody = document.getElementById('cart-body');
const orderTotalCell = document.getElementById('orderTotal');
const usd = (currency) => '$' + currency.toFixed(2);

cart.forEach(cartItem => {
    const box = findById(cartItem.id, boxes);
    const lineItem = renderLineItem(cartItem, box);
    tbody.appendChild(lineItem);
});

const orderTotal = cartTotal(cart, boxes);
orderTotalCell.textContent = usd(orderTotal);
