import boxes from '../data/boxes.js';
import renderBox from './renderProducts.js';
import { getCartQuantity } from '../common/cart-api.js'

const container = document.getElementById('products');
const cartdiv = document.getElementById('cartinfo');
let cartQuantity = getCartQuantity();

cartdiv.textContent = 'view cart (' + cartQuantity + ')';

for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    container.appendChild(renderBox(box));
}