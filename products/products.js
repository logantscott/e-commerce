import boxes from '../data/boxes.js';
import renderBox from './renderProducts.js';

console.log('test');

const container = document.getElementById('product');

for (let i = 0; i < boxes.length; i++) {
    console.log('hi');
    console.log(boxes[i].name);
   
    container.appendChild(renderBox(boxes[i]));
}