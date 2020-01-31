import { usd } from '../common/utils.js';
import { viewAnalytics } from '../common/cart-api.js';

// BOXES OBJECT
// [
//     {"id":"small","name":"Small Box","image":"../assets/smallbox.jpg","color":"brown","description":"Our smallest box.","category":"boxes","price":4.5},
//     {"id":"medium","name":"Medium Box","image":"../assets/mediumbox.jpg","color":"brown","description":"It's a medium box.","category":"boxes","price":9.99},
//     {"id":"large","name":"Large Box","image":"../assets/largebox.jpg","color":"brown","description":"It's a large box.","category":"boxes","price":14.5},
//     {"id":"average","name":"Average Box","image":"../assets/averagebox.jpg","color":"brown","description":"Our best selling box!","category":"boxes","price":5,"sale":4.95},
//     {"id":"long","name":"Long Box","image":"../assets/longbox.jpg","color":"brown","description":"It's a long box.","category":"boxes","price":17},
//     {"id":"flat","name":"Flat Box","image":"../assets/flatbox.jpg","color":"brown","description":"For, like, TV's?.","category":"boxes","price":13,"sale":9.99},
//     {"id":"donut","name":"Donut Box","image":"../assets/donutbox.jpg","color":"pink","description":"No one really knows what this box is used for.","category":"boxes","price":27}
// ]

// CART OBJECT
// [ 
//     {"id":"long","quantity":5},
//     {"id":"average","quantity":2},
//     {"id":"large","quantity":3},
//     {"id":"medium","quantity":2},
//     {"id":"small","quantity":1}
// ]

const salesResults = viewAnalytics();
// const currentDataset = localStorage.getItem('currentDataset') ? JSON.parse(localStorage.getItem('currentDataset')) : 'allSessions';
const currentView = localStorage.getItem('currentView') ? JSON.parse(localStorage.getItem('currentView')) : 'chart1';

// document.getElementById(currentDataset).classList.add('selected');

renderAnalyticsTable();

function renderAnalyticsTable(sortResults = Object.keys(salesResults)) {
    //RENDER__________________________________
    const container = document.getElementById('analyticsContainer');

    const table = document.createElement('table');
    table.id = 'analyticsTable';

    const tableHeader = document.createElement('thead');
    const tableHeaderRow = document.createElement('tr');
    const headers = ['Product ID', 'Product Name', 'Quantity', 'Amount'];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        th.addEventListener('click', () => {
            sortAnalytics(header.toLowerCase());
        });
        tableHeaderRow.appendChild(th);
    });

    tableHeader.appendChild(tableHeaderRow);
    table.appendChild(tableHeader);

    const tableBody = document.createElement('tbody');

    sortResults.forEach(key => {
        const tr = document.createElement('tr');
        const id = document.createElement('td');
        const name = document.createElement('td');
        const quantity = document.createElement('td');
        const amount = document.createElement('td');

        // console.log(key);

        id.textContent = key;
        name.textContent = salesResults[key].name ? salesResults[key].name : key;
        quantity.textContent = salesResults[key].quantity ? salesResults[key].quantity : 0;
        amount.textContent = salesResults[key].salePrice ? usd(salesResults[key].salePrice) : 0; // price * quantity

        tr.append(id, name, quantity, amount);
        tableBody.appendChild(tr);
    });

    table.appendChild(tableBody);

    const tableFooter = document.createElement('tfoot');
    const tableFooterRow = document.createElement('tr');
    const footers = ['Total', '', sumQuantity(), sumAmount()];

    footers.forEach(footer => {
        const td = document.createElement('td');
        td.textContent = footer;
        tableFooterRow.appendChild(td);
    });

    tableFooter.appendChild(tableFooterRow);
    table.appendChild(tableFooter);

    container.appendChild(table);
}

let headerSorts = {};

function sortAnalytics(header) {
    let sortResults;

    if (!headerSorts[header]) headerSorts[header] = {};
    headerSorts[header].sort = headerSorts[header].sort ? headerSorts[header].sort * -1 : 1;

    // console.log(salesResults);

    document.getElementById('analyticsTable').remove();
    if (header === 'quantity') {
        sortResults = headerSorts[header].sort < 0
            ? Object.keys(salesResults).sort(function(a, b){return salesResults[a][header] - salesResults[b][header];})
            : Object.keys(salesResults).sort(function(a, b){return salesResults[a][header] - salesResults[b][header];}).reverse();
    } else if (header === 'amount') {
        sortResults = headerSorts[header].sort < 0
            ? Object.keys(salesResults).sort(function(a, b){return salesResults[a]['salePrice'] - salesResults[b]['salePrice'];})
            : Object.keys(salesResults).sort(function(a, b){return salesResults[a]['salePrice'] - salesResults[b]['salePrice'];}).reverse();
    } else {
        sortResults = headerSorts[header].sort > 0
            ? Object.keys(salesResults).sort()
            : Object.keys(salesResults).sort().reverse();
    }

    renderAnalyticsTable(sortResults);
    prepareChartData(sortResults);
    myChart1.data.datasets[0].data = dataQuantity;
    myChart1.data.labels = labels;
    myChart2.data.datasets[0].data = dataAmount;
    myChart2.data.labels = labels;
    myChart1.update();
    myChart2.update();
    // }
}

function sumQuantity() {
    let total = 0;
    Object.keys(salesResults).forEach(key => {
        total = salesResults[key].quantity ? total + salesResults[key].quantity : total;
    });
    return total;
}

function sumAmount() {
    let total = 0;
    Object.keys(salesResults).forEach(key => {
        total = salesResults[key].salePrice ? total + salesResults[key].salePrice : total;
    });
    return usd(total);
}


//CHART
const ctx1 = document.getElementById('chart1').getContext('2d');
const ctx2 = document.getElementById('chart2').getContext('2d');

let dataQuantity;
let dataAmount;
let labels;

function prepareChartData(sortResults = Object.keys(salesResults)) {
    dataQuantity = [];
    dataAmount = [];
    labels = [];

    sortResults.forEach(key => {
        let quantity = salesResults[key].quantity ? salesResults[key].quantity : 0;
        let amount = salesResults[key].salePrice ? salesResults[key].salePrice : 0;
        dataQuantity.push(quantity);
        dataAmount.push(amount);

        labels.push(key);
        
    });
    // console.log(labels);
}

prepareChartData();

const setColors = function(red, green, blue, sort) {
    let colorArray = [];
    for (let i = 0; i < Object.keys(salesResults).length; i++) {
        let divInt = Math.floor((755 - 455) / Object.keys(salesResults).length);

        const arrColor = ((i * divInt) + divInt);

        const b = blue > 0 ? 255 : Math.floor(arrColor / 2);
        const r = red > 0 ? 255 : Math.floor(arrColor / 2);
        const g = green > 0 ? 255 : Math.floor(arrColor / 2);

        sort > 0 ? colorArray.push('rgb(' + r + ',' + g + ',' + b + ')') : colorArray.unshift('rgb(' + r + ',' + g + ',' + b + ')');
        // colorArray.push(dynamicColors());
    }
    
    return colorArray;
};

// eslint-disable-next-line no-unused-vars
const myChart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: '# Quantity Sold',
            data: dataQuantity,
            backgroundColor: setColors(0, 0, 1, 1)
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

// eslint-disable-next-line no-unused-vars
const myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: '$ Amount Sold',
            data: dataAmount,
            backgroundColor: setColors(1, 0, 0, 1)
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

document.getElementById('analyticsTable').classList.add('hide');
document.getElementById('chart1').classList.add('hide');
document.getElementById('chart2').classList.add('hide');
document.getElementById(currentView).classList.remove('hide');

const analyticsButtons = document.querySelectorAll('span.button');

for (let i = 0; i < analyticsButtons.length; i++) {
    analyticsButtons[i].addEventListener('click', () => {
        document.getElementById('analyticsTable').classList.add('hide');
        document.getElementById('chart1').classList.add('hide');
        document.getElementById('chart2').classList.add('hide');
        document.getElementById('analyticsTableButton').classList.remove('selected');
        document.getElementById('chart1Button').classList.remove('selected');
        document.getElementById('chart2Button').classList.remove('selected');
        document.getElementById(analyticsButtons[i].id.replace('Button', '')).classList.remove('hide');
        document.getElementById(analyticsButtons[i].id).classList.add('selected');

        localStorage.setItem('currentView', JSON.stringify(analyticsButtons[i].id.replace('Button', '')));
    });
}