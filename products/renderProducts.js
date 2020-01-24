import { findById } from '../common/utils.js';

function renderBox(box) {
    const li = document.createElement('li');

    const h3 = document.createElement('h3');
    h3.textContent = box.name;
    li.appendChild(h3);

    const img = document.createElement('img');
    img.src = '../assets/' + box.image;
    img.alt = box.name + ' image';
    li.appendChild(img);

    const div = document.createElement('div');
    div.className = 'price';
    li.appendChild(div);

    const usd = (currency) => '$' + currency.toFixed(2);
    
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
    
    const button = document.createElement('button');
    button.textContent = 'Add to Cart';
    button.className = 'addProduct';
    button.value = box.id;
    button.addEventListener('click', () => {
        const cartdiv = document.getElementById('cartinfo');
        let totalQuantity = 0;
        let cart = localStorage.getItem('CART');

        if (cart) {
            // console.log(cart);
            cart = JSON.parse(cart);
            cart.forEach(cartItem => {
                totalQuantity = totalQuantity + cartItem.quantity;
            });
        } else {
            cart = [];
            totalQuantity = 1;
        }

        let itemInCart = findById(box.id, cart);

        if (!itemInCart) {
            const initialItem = {
                id: box.id,
                quantity: 1
            };

            cart.push(initialItem);
        } else {
            itemInCart.quantity++;
        }

        const newCartState = JSON.stringify(cart);
        localStorage.setItem('CART', newCartState);

        cartdiv.textContent = totalQuantity + ' Items';

    });
    li.appendChild(button);

    return li;
}

export default renderBox;