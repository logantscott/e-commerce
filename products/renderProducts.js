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


    const salespan = document.createElement('span');
    const pricespan = document.createElement('span');
    if (box.sale) {
        salespan.textContent = box.sale + '&nbsp;&nbsp;';
        div.appendChild(salespan);
    }
    const usd = '$' + box.price.toFixed(2);
    pricespan.textContent = usd;
    div.appendChild(pricespan);

    const p = document.createElement('p');
    p.className = 'description';
    li.appendChild(p);
    
    const button = document.createElement('button');
    button.textContent = 'Add to Cart';
    button.value = box.id;
    p.appendChild(button);

    return li;
}

export default renderBox;