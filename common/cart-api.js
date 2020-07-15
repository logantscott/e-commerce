import { findById, getBoxes } from '../common/utils.js';

const boxes = getBoxes();

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
    let boxName = findById(box.id, boxes).name ? findById(box.id, boxes).name : box.id;
    let price = findById(box.id, boxes).sale ? findById(box.id, boxes).sale : findById(box.id, boxes).price;

    if (!itemInCart) {
        const initialItem = {
            id: box.id,
            name: boxName,
            quantity: Number(selectQuantity.value),
            salePrice: price
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

export function updateSalesResults(cart, salesResults = getSalesResults()) {
    cart.forEach(sale => {
        sale.salePrice = Number((sale.salePrice * sale.quantity).toFixed(2));
        salesResults.push(sale);
    });
    localStorage.setItem('SALES', JSON.stringify(salesResults));
    return salesResults;
}

export function getSalesResults() {
    return localStorage.getItem('SALES') ? JSON.parse(localStorage.getItem('SALES')) : [] ;
}

export function viewAnalytics(sales = getSalesResults()) {
    let salesResults = {};
    
    sales.forEach(sale => {
        if (!salesResults[sale.id]) salesResults[sale.id] = {};
        salesResults[sale.id].id = sale.id;
        salesResults[sale.id].name = sale.name;
        salesResults[sale.id].quantity = salesResults[sale.id].quantity ? salesResults[sale.id].quantity + sale.quantity : sale.quantity;
        salesResults[sale.id].salePrice = salesResults[sale.id].salePrice ? salesResults[sale.id].salePrice + sale.salePrice : sale.salePrice;
    });

    // check missing and fill 0's if so
    // Object.keys(salesResults).forEach(key => {
    //     salesResults[key].impressions = salesResults[key].impressions ? salesResults[key].impressions : 0;
    //     salesResults[key].clicks = salesResults[key].clicks ? salesResults[key].clicks : 0;
    // });

    // console.log(salesResults);
    
    return salesResults;
}