// create line item for every item in cart
// So... tbody for loop, tr wrap, td for each property

export default function renderLineItem(cartItem, box) {
    // make row parent for tds
    const tr = document.createElement('tr');
    const usd = (currency) => '$' + (Math.round(currency * 100) / 100).toFixed(2);
    const boxPrice = (box.sale) ? box.sale : box.price;

    // 1st col -> name
    const nameTd = document.createElement('td');
    nameTd.textContent = box.name;
    tr.appendChild(nameTd);

    // 2nd col -> quantity
    const quantityTd = document.createElement('td');
    quantityTd.textContent = cartItem.quantity;
    tr.appendChild(quantityTd);

    // 3rd col -> price
    const priceTd = document.createElement('td');
    priceTd.className = 'money';
    priceTd.textContent = usd(boxPrice);
    tr.appendChild(priceTd);

    // 4th col -> line total    
    
    const lineTotalTd = document.createElement('td');
    lineTotalTd.className = 'money';
    lineTotalTd.textContent = usd(cartItem.quantity * (boxPrice));
    tr.appendChild(lineTotalTd);

    return tr;
}