import { addToCart, getCart, getCartQuantity } from '../common/cart-api.js';
import { usd, getBoxes } from '../common/utils.js';

let boxes = getBoxes();

function renderBox(box) {
    const li = document.createElement('li');
    li.id = 'id' + box.id;

    const h3 = document.createElement('h3');
    h3.textContent = box.name;
    h3.id = 'name' + box.id;
    li.appendChild(h3);

    const img = document.createElement('img');
    img.id = 'img' + box.id;
    img.src = box.image;
    img.alt = box.name + ' image';
    li.appendChild(img);

    const div = document.createElement('div');
    div.className = 'price' + box.id;
    li.appendChild(div);
    
    const pricespan = document.createElement('span');
    pricespan.className = 'green';
    if (box.sale) {
        const salespan = document.createElement('span');
        salespan.innerHTML = usd(box.sale) + '&nbsp;&nbsp;';
        salespan.className = 'green sale';
        salespan.id = 'sale' + box.id;
        div.appendChild(salespan);
        pricespan.className = 'red';
    }
    pricespan.id = 'price' + box.id;
    pricespan.textContent = usd(box.price);
    div.appendChild(pricespan);

    const p = document.createElement('p');
    p.className = 'description';
    p.textContent = box.description;
    li.appendChild(p);

    const addToCartDiv = document.createElement('div');
    addToCartDiv.className = 'addToCart';

    if (window.location.href.indexOf('product-entry') !== -1) {
        const delSpan = document.createElement('span');
        delSpan.textContent = 'X';
        delSpan.className = 'delete';
        // delSpan.id = 'del' + box.id;
        delSpan.addEventListener('click', () => {
            const delCheck = confirm('Are you sure you want to remove ' + box.name + '?');
            if (delCheck) {
                let cart = getCart();
                boxes = getBoxes();
                if (cart[cart.findIndex(cartitem => cartitem.id === box.id)]) {
                    delete cart.splice(cart.findIndex(cartitem => cartitem.id === box.id), 1);
                    localStorage.setItem('CART', JSON.stringify(cart));
                }
                delete boxes.splice(boxes.findIndex(boxitem => boxitem.id === box.id), 1);
                // delSpan.id.substr(3)
                localStorage.setItem('BOXES', JSON.stringify(boxes));

                delSpan.parentElement.remove();
            }
        });
        li.appendChild(delSpan);
    } else {
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
    }
    
    const button = document.createElement('button');
    // change button text depnding on page
    if (window.location.href.indexOf('product-entry') !== -1) {
        button.className = 'editProduct';
        button.textContent = 'Edit Box';
    } else {
        button.textContent = 'Add to Cart';
        button.className = 'addProduct';
    }
    button.value = box.id;
    button.addEventListener('click', () => {
        // change button action depending on page
        if (window.location.href.indexOf('product-entry') !== -1) {

            const inputs = document.getElementsByTagName('input');
            inputs.id.value = box.id;
            inputs.name.value = box.name;
            inputs.image.value = box.image;
            inputs.price.value = box.price;
            inputs.sale.value = box.sale ? box.sale : '';

        } else {
            const cartdiv = document.getElementById('cartinfo');
            const selectQuantity = document.getElementById('select' + box.id);

            // add item(s) to cart
            addToCart(box, selectQuantity);

            // update cart quantity in DOM
            if (cartdiv) {
                const cartQuantity = getCartQuantity();
                cartdiv.textContent = 'view cart (' + cartQuantity + ')';
            }
        }
    });
    addToCartDiv.appendChild(button);
    li.appendChild(addToCartDiv);

    return li;
}

export default renderBox;