import boxes from '../data/boxes.js';
import renderBox from './renderProducts.js';
import { getCartQuantity } from '../common/cart-api.js';

const container = document.getElementById('products');
const cartdiv = document.getElementById('cartinfo');
const addformSubmit = document.getElementById('addform-submit');
const form = document.querySelector('form');

let cartQuantity = getCartQuantity();

// set cart quantity element on page load
cartdiv ? cartdiv.textContent = 'view cart (' + cartQuantity + ')' : null ;

// render products for all items in boxes
for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    container.appendChild(renderBox(box));
}

addformSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    // alert(data);

    const newBox = {
        id: data.get('id'),
        name: data.get('name'),
        image: data.get('image'),
        color: data.get('color'),
        description: data.get('description'),
        category: data.get('category'),
        price: data.get('price'),
        sale: data.get('sale')
    };

    console.log(newBox);
})