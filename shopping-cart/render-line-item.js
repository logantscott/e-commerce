import { usd } from '../common/utils.js';
// create line item for every item in cart
// So... tbody for loop, tr wrap, td for each property

export default function renderLineItem(cartItem, box) {
    // make row parent for tds
    const tr = document.createElement('tr');
    const boxPrice = (box.sale) ? box.sale : box.price;

    const lineItemTDs = [
        {
            textContent: box.name
        },
        {
            textContent: cartItem.quantity
        },
        {
            textContent: usd(boxPrice),
            class: 'money'
        },
        {
            textContent: usd(cartItem.quantity * (boxPrice)),
            class: 'money'
        }
    ];

    lineItemTDs.forEach(lineItemTD => {
        const newTD = document.createElement('td');
        newTD.textContent = lineItemTD.textContent;
        newTD.className = lineItemTD.class;
        tr.appendChild(newTD);
    });

    return tr;
}