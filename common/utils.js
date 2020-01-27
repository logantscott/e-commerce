import boxSeedArray from '../data/boxes.js';

export function findById(cartItemID, boxesArray) {
    let match;
    boxesArray.forEach(boxItem => {if (cartItemID === boxItem.id) match = boxItem;});
    return match;
}

export function calcLineItem(price, quantity) {
    const subTotal = Math.round((price * quantity) * 100) / 100;
    return subTotal;
}

export function cartTotal(cartArray, boxArray) {
    let total = 0;
    cartArray.forEach(cartItem => {
        boxArray.forEach(boxItem => {
            if (cartItem.id === boxItem.id) {
                if (boxItem.sale) {
                    total = total + calcLineItem(boxItem.sale, cartItem.quantity);
                } else if (boxItem.price) {
                    total = total + calcLineItem(boxItem.price, cartItem.quantity);
                }
            }
        });
    });
    return total;
}

export function usd(currency) {
    return '$' + currency.toFixed(2);
}

const boxKey = 'BOXES';

export function getBoxes() {
    let boxes = localStorage.getItem(boxKey);
    console.log(boxes.length);

    if (!boxes || boxes === '[]') {
        localStorage.setItem(boxKey, JSON.stringify(boxSeedArray));
        boxes = localStorage.getItem(boxKey);
    }
    return JSON.parse(boxes);
}

export function updateBoxes(newBox) {
    // get current product list
    let boxes = getBoxes();
    // add new box to product list (BOXES)
    boxes.push(newBox);
    // update BOXES in localstorage
    localStorage.setItem('BOXES', JSON.stringify(boxes));
}