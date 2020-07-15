// import boxes from '../data/boxes.js';
import renderBox from './renderProducts.js';
import { getCartQuantity } from '../common/cart-api.js';
import { getBoxes, updateBoxes, usd } from '../common/utils.js';

let boxes = getBoxes();

console.log(JSON.stringify(boxes));

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
        let editType = 'add';
        boxes = getBoxes();
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

        if (newBox.sale === 0) {
            delete newBox.sale;
        }
        if (boxes[boxes.findIndex(boxitem => boxitem.id === newBox.id)]) {
            // console.log('dummy');
            const checkOverwrite = confirm('This id already exists! Confirm overwrite?');
            if (checkOverwrite) { 
                console.log('overwriting ' + newBox.id);
                editType = 'edit';
            } else {
                return;
            }
        }
        if (!newBox.name || !newBox.description || !newBox.image) {
            alert('Please fill in all fields!');
            return;
        } else if (!newBox.price && newBox.name && newBox.description && newBox.image) {
            alert('Please enter a price!');
            return;
        }

        updateBoxes(newBox, editType);
        // newBox.addProduct();
        if (editType === 'edit') {
            console.log('id' + newBox.id);
            // document.querySelector('#id' + newBox.id).textContent = newBox.id;
            document.querySelector('#name' + newBox.id).textContent = newBox.name;
            document.querySelector('#img' + newBox.id).src = newBox.image;
            if (newBox.sale && Number(newBox.sale)) { // need to check for sale span
                if (document.querySelector('#sale' + newBox.id)) {
                    document.querySelector('#sale' + newBox.id).innerHTML = usd(newBox.sale) + '&nbsp;&nbsp;';
                } else {
                    const salespan = document.createElement('span');
                    salespan.innerHTML = usd(newBox.sale) + '&nbsp;&nbsp;';
                    salespan.className = 'green sale';
                    document.querySelector('.price' + newBox.id).insertBefore(salespan, document.querySelector('.price' + newBox.id).childNodes[0]); 
                }    
            }
            document.querySelector('#price' + newBox.id).textContent = usd(newBox.price);
        } else {
            container.appendChild(renderBox(newBox));
        }
    });
}