// IMPORT MODULES under test here:
// import example from '../src/example.js';
import { updateSalesResults, viewAnalytics } from '../common/cart-api.js';

const test = QUnit.test;

test('get sales - test is pointless, testing set/getitem?', function(assert) {

    const testitem = [
        { id: 'long', name: 'Long Box', quantity: 1, salePrice: 17 },
        { id: 'average', name: 'Average Box', quantity: 3, salePrice: 14.85 },
        { id: 'donut', name: 'Donut Box', quantity: 2, salePrice: 54 },
        { id: 'flat', name: 'Flat Box', quantity: 1, salePrice: 9.99 },
        { id: 'long', name: 'Long Box', quantity: 1, salePrice: 17 },
        { id: 'flat', name: 'Flat Box', quantity: 5, salePrice: 49.95 },
        { id: 'donut', name: 'Donut Box', quantity: 7, salePrice: 189 },
        { id: 'flat', name: 'Flat Box', quantity: 1, salePrice: 9.99 },
        { id: 'average', name: 'Average Box', quantity: 1, salePrice: 4.95 },
        { id: 'large', name: 'Large Box', quantity: 1, salePrice: 14.5 },
        { id: 'long', name: 'Long Box', quantity: 1, salePrice: 17 },
        { id: 'flat', name: 'Flat Box', quantity: 5, salePrice: 249.75 },
        { id: 'donut', name: 'Donut Box', quantity: 7, salePrice: 1323 },
        { id: 'flat', name: 'Flat Box', quantity: 1, salePrice: 9.99 }
    ];

    const expect = JSON.stringify(testitem);
    sessionStorage.setItem('testsales', expect);

    const result = sessionStorage.getItem('testsales');

    assert.deepEqual(result, expect);
});

test('add sale', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const sales = [
        { id: 'long', name: 'Long Box', quantity: 1, salePrice: 17 },
        { id: 'average', name: 'Average Box', quantity: 3, salePrice: 14.85 },
        { id: 'donut', name: 'Donut Box', quantity: 2, salePrice: 54 },
        { id: 'flat', name: 'Flat Box', quantity: 1, salePrice: 9.99 },
        { id: 'long', name: 'Long Box', quantity: 1, salePrice: 17 },
        { id: 'flat', name: 'Flat Box', quantity: 5, salePrice: 49.95 },
        { id: 'donut', name: 'Donut Box', quantity: 7, salePrice: 189 },
        { id: 'flat', name: 'Flat Box', quantity: 1, salePrice: 9.99 },
        { id: 'average', name: 'Average Box', quantity: 1, salePrice: 4.95 },
        { id: 'large', name: 'Large Box', quantity: 1, salePrice: 14.5 }
    ];
    
    const cart = [
        { id: 'long', name: 'Long Box', quantity: 1, salePrice: 17 },
        { id: 'flat', name: 'Flat Box', quantity: 5, salePrice: 49.95 },
        { id: 'donut', name: 'Donut Box', quantity: 7, salePrice: 189 },
        { id: 'flat', name: 'Flat Box', quantity: 1, salePrice: 9.99 }
    ];

    const expect = [
        { id: 'long', name: 'Long Box', quantity: 1, salePrice: 17 },
        { id: 'average', name: 'Average Box', quantity: 3, salePrice: 14.85 },
        { id: 'donut', name: 'Donut Box', quantity: 2, salePrice: 54 },
        { id: 'flat', name: 'Flat Box', quantity: 1, salePrice: 9.99 },
        { id: 'long', name: 'Long Box', quantity: 1, salePrice: 17 },
        { id: 'flat', name: 'Flat Box', quantity: 5, salePrice: 49.95 },
        { id: 'donut', name: 'Donut Box', quantity: 7, salePrice: 189 },
        { id: 'flat', name: 'Flat Box', quantity: 1, salePrice: 9.99 },
        { id: 'average', name: 'Average Box', quantity: 1, salePrice: 4.95 },
        { id: 'large', name: 'Large Box', quantity: 1, salePrice: 14.5 },
        { id: 'long', name: 'Long Box', quantity: 1, salePrice: 17.00 },
        { id: 'flat', name: 'Flat Box', quantity: 5, salePrice: 249.75 },
        { id: 'donut', name: 'Donut Box', quantity: 7, salePrice: 1323.00 },
        { id: 'flat', name: 'Flat Box', quantity: 1, salePrice: 9.99 }
    ];
    
    //Act 
    // Call the function you're testing and set the result to a const

    const result = updateSalesResults(cart, sales);

    //Assert
    // Make assertions about what is expected valid result
    assert.deepEqual(JSON.stringify(result), JSON.stringify(expect));
});

test('calculate sales', function(assert) {

    const sales = [
        { id: 'long', name: 'Long Box', quantity: 1, salePrice: 17 },
        { id: 'average', name: 'Average Box', quantity: 3, salePrice: 14.85 },
        { id: 'donut', name: 'Donut Box', quantity: 2, salePrice: 54 },
        { id: 'flat', name: 'Flat Box', quantity: 1, salePrice: 9.99 },
        { id: 'long', name: 'Long Box', quantity: 1, salePrice: 17 },
        { id: 'flat', name: 'Flat Box', quantity: 5, salePrice: 49.95 },
        { id: 'donut', name: 'Donut Box', quantity: 7, salePrice: 189 },
        { id: 'flat', name: 'Flat Box', quantity: 1, salePrice: 9.99 },
        { id: 'average', name: 'Average Box', quantity: 1, salePrice: 4.95 },
        { id: 'large', name: 'Large Box', quantity: 1, salePrice: 14.5 },
        { id: 'long', name: 'Long Box', quantity: 1, salePrice: 17.00 },
        { id: 'flat', name: 'Flat Box', quantity: 5, salePrice: 249.75 },
        { id: 'donut', name: 'Donut Box', quantity: 7, salePrice: 1323.00 },
        { id: 'flat', name: 'Flat Box', quantity: 1, salePrice: 9.99 }
    ];

    const expect = {
        long: { id: 'long', name: 'Long Box', quantity: 3, salePrice: 51 },
        average: { id: 'average', name: 'Average Box', quantity: 4, salePrice: 19.80 },
        donut: { id: 'donut', name: 'Donut Box', quantity: 16, salePrice: 1566 },
        flat: { id: 'flat', name: 'Flat Box', quantity: 13, salePrice: 329.67 },
        large: { id: 'large', name: 'Large Box', quantity: 1, salePrice: 14.5 }
    };

    const result = viewAnalytics(sales);

    assert.deepEqual(JSON.stringify(result), JSON.stringify(expect));
});