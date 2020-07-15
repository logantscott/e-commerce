import { usd } from '../common/utils.js';
// create line item for every item in cart
// So... tbody for loop, tr wrap, td for each property

export default function renderLineItem(cartItem, box) {
    // make row parent for tds
    const tr = document.createElement('tr');
    const boxPrice = (box.sale) ? box.sale : box.price;

    const tds = [
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

    tds.forEach(element => {
        const td = document.createElement('td');
        td.textContent = element.textContent;
        td.className = element.class;
        tr.appendChild(td);
    });

    return tr;
}