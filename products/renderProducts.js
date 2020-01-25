import { addToCart, getCartQuantity } from '../common/cart-api.js';
import { usd, getBoxes } from '../common/utils.js';

getBoxes();

function renderBox(box) {
    const li = document.createElement('li');

    const h3 = document.createElement('h3');
    h3.textContent = box.name;
    li.appendChild(h3);

    const img = document.createElement('img');
    img.src = box.image;
    img.alt = box.name + ' image';
    li.appendChild(img);

    const div = document.createElement('div');
    div.className = 'price';
    li.appendChild(div);
    
    const pricespan = document.createElement('span');
    pricespan.className = 'green';
    if (box.sale) {
        const salespan = document.createElement('span');
        salespan.innerHTML = usd(box.sale) + '&nbsp;&nbsp;';
        div.appendChild(salespan);
        salespan.className = 'green sale';
        pricespan.className = 'red';
    }
    pricespan.textContent = usd(box.price);
    div.appendChild(pricespan);

    const p = document.createElement('p');
    p.className = 'description';
    p.textContent = box.description;
    li.appendChild(p);

    const addToCartDiv = document.createElement('div');
    addToCartDiv.className = 'addToCart';

    const selectQuantity = document.createElement('select');
    selectQuantity.id = 'select' + box.id;
    const options = [];
    for (let i = 1; i <= 5; i++) {
        options[i - 1] = document.createElement('option');
        options[i - 1].value = i;
        options[i - 1].textContent = i;
    }

    options.forEach(option => selectQuantity.appendChild(option));
    addToCartDiv.append(selectQuantity);

    
    const button = document.createElement('button');
    button.textContent = 'Add to Cart';
    button.className = 'addProduct';
    button.value = box.id;
    button.addEventListener('click', () => {
        const cartdiv = document.getElementById('cartinfo');
        const selectQuantity = document.getElementById('select' + box.id);

        // add item(s) to cart
        addToCart(box, selectQuantity);

        // update cart quantity in DOM
        if (cartdiv) {
            const cartQuantity = getCartQuantity();
            cartdiv.textContent = 'view cart (' + cartQuantity + ')';
        }
    });
    addToCartDiv.appendChild(button);
    li.appendChild(addToCartDiv);

    return li;
}

export default renderBox;