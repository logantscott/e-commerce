import boxes from '../data/boxes.js';
import renderBox from './renderProducts.js';

const container = document.getElementById('products');
const cartdiv = document.getElementById('cartinfo');
let totalQuantity = 0;
const json = localStorage.getItem('CART');

if (json) {
    cartdiv.textContent = JSON.parse(json).forEach(cartItem => {
        totalQuantity = totalQuantity + cartItem.quantity;
    });
}

cartdiv.textContent = totalQuantity + ' Items';

for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    container.appendChild(renderBox(box));
}