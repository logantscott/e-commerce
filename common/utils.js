export function findById(cartItemID, boxesArray) {
    let match;
    boxesArray.forEach(boxItem => {if (cartItemID === boxItem.id) match = boxItem;});
    return match;
}

export function calcLineItem(price, quantity) {
    const subTotal = Math.round((price * quantity) * 100) / 100;
    return subTotal;
}