import { findById } from '../common/utils.js';

export function getCart() {
    let cart = localStorage.getItem('CART');
    if (cart) {
        return JSON.parse(cart);
    } else {
        return [];
    }
}

export function addToCart(box, selectQuantity) {
    const cart = getCart();

    let itemInCart = findById(box.id, cart);

    if (!itemInCart) {
        const initialItem = {
            id: box.id,
            quantity: Number(selectQuantity.value)
        };

        cart.push(initialItem);
    } else {
        itemInCart.quantity += Number(selectQuantity.value);
    }

    const newCartState = JSON.stringify(cart);
    localStorage.setItem('CART', newCartState);
}

export function clearCart() {
    localStorage.removeItem('CART');
}

export function getCartQuantity() {
    const cart = getCart();
    let quantity = 0;

    cart.forEach(cartItem => {
        quantity = quantity + cartItem.quantity;
    });

    return quantity;
}