import { getBoxes } from '../common/utils.js';

let boxes = getBoxes();

function renderBox(box) {
    const li = document.createElement('li');
    li.id = 'id' + box.id;

    const img = document.createElement('img');
    img.id = 'img' + box.id;
    img.src = box.image;
    img.alt = box.name + ' image';
    li.appendChild(img);

    const h3 = document.createElement('h3');
    h3.textContent = box.name;
    h3.id = 'name' + box.id;
    li.appendChild(h3);

    return li;
}

const container = document.getElementById('products');

// render products for all items in boxes
for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    container.appendChild(renderBox(box));
}