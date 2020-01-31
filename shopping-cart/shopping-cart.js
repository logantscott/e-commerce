// import cart from '../data/cart.js';
// import boxes from '../data/boxes.js';
import { findById, cartTotal, usd, getBoxes } from '../common/utils.js';
import renderLineItem from './render-line-item.js';
import { getCart, clearCart, updateSalesResults } from '../common/cart-api.js';

const boxes = getBoxes();

const orderButton = document.getElementById('placeOrder');
const tbody = document.getElementById('cart-body');
const orderTotalCell = document.getElementById('orderTotal');
const cart = getCart();

// reload on storage update if cart changed
window.addEventListener('storage', () => {
    if (JSON.stringify(cart) !== JSON.stringify(getCart())) {
        window.location = './';
    }
});

// update order total in cart
const orderTotal = cartTotal(cart, boxes);
orderTotalCell.textContent = usd(orderTotal);

// check cart contents, do stuff if it has stuff
if (cart.length === 0) {
    // disable order button if cart empty
    orderButton.disabled = 'disabled';
} else { 
    // render each tabel row per cart item
    cart.forEach(cartItem => {
        const box = findById(cartItem.id, boxes);
        const lineItem = renderLineItem(cartItem, box);
        tbody.appendChild(lineItem);
    });

    // add place order event listener - alerts cart contents, clears storage, returns home
    orderButton.addEventListener('click', () => {
        // alert(JSON.stringify(cart, true, 2));
        updateSalesResults(cart);
        // console.log(JSON.stringify(cart));
        clearCart();
        cartTotal([], []);
        window.location = '../';
    });
}

