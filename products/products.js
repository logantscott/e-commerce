import boxes from '../data/boxes.js';
import renderBox from './renderProducts.js';

const container = document.getElementById('products');

for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    container.appendChild(renderBox(box));
}