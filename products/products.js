// import boxes from '../data/boxes.js';
import renderBox from './renderProducts.js';
import { getCartQuantity } from '../common/cart-api.js';
import { getBoxes, updateBoxes } from '../common/utils.js';

let boxes = getBoxes();

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

if (addformSubmit) {
    addformSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        const data = new FormData(form);

        const newBox = {
            id: data.get('id'),
            name: data.get('name'),
            image: data.get('image'),
            // color: data.get('color'),
            description: data.get('description') ? data.get('description') : 'Default descrip lol.',
            // category: data.get('category'),
            price: Number(data.get('price')),
            sale: Number(data.get('sale'))
            //addProduct: function() { updateBoxes(this); }
        };

        // newBox.forEach(el => console.log(newBox[el]));
        // for (let [key, value] of Object.entries(newBox)) {
        //     console.log(`${key}: ${value}`);
        //     console.log(!newBox[key] === true && newBox[key] !== 0);
        // }

        console.log(Object.keys(newBox).some(el => (!newBox[el])));
        console.log(Object.keys(newBox).some(el => (el === 'sale')));
        console.log(Object.keys(newBox).some(el => (newBox[el] === 0)));

        if (Object.keys(newBox).some(el => (!newBox[el]))) {
            // need better validation/error checking to prevent null... or put defaults in newBox
            if (newBox.sale === 0) {
                delete newBox.sale;
            }
            if (!newBox.price && newBox.name && newBox.description && newBox.image) {
                alert('Please enter a price!');
                return;
            } else if (!newBox.name || !newBox.description || !newBox.image) {
                alert('Please fill in all fields!');
                return;
            }
        }

        updateBoxes(newBox);
        // newBox.addProduct();

        container.appendChild(renderBox(newBox));
    });
}