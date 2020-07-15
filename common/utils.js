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