// IMPORT MODULES under test here:
// import example from '../src/example.js';
import { findById, calcLineItem, cartTotal } from '../common/utils.js';

const test = QUnit.test;

test('test findById', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const expect = {
        id: 'average',
        name: 'Average Box'
    };
    
    const averageBox = {
        id: 'average',
        name: 'Average Box'
    };
    
    const boxes = [averageBox];

    //Act 
    // Call the function you're testing and set the result to a const
    const average = findById('average', boxes);
    //Assert
    // Make assertions about what is expected valid result
    assert.equal(JSON.stringify(average), JSON.stringify(expect));
});

test('test calcLineItem', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const expect = 27.33;
    
    //Act 
    // Call the function you're testing and set the result to a const
    const calc = calcLineItem(9.11, 3);
    //Assert
    // Make assertions about what is expected valid result
    assert.equal(calc, expect);
});

test('test cartTotal', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const expect = 189.00;

    const cart = [{
        id: 'medium',
        quantity: 7
    }, {
        id: 'small',
        quantity: 15
    }, {
        id: 'donut',
        quantity: 1
    }, {
        id: 'flat',
        quantity: 3
    }];    
    
    const mediumBox = {
        id: 'medium',
        price: 9.00
    };
    
    const smallBox = {
        id: 'small',
        price: 4.00
    };
    
    const flatBox = {
        id: 'flat',
        price: 13.00
    };
    
    const donutBox = {
        id: 'donut',
        price: 27.00
    };
    
    const boxes = [
        smallBox,
        mediumBox,
        flatBox,
        donutBox
    ];
    
    //Act 
    // Call the function you're testing and set the result to a const
    const calc = cartTotal(cart, boxes);
    //Assert
    // Make assertions about what is expected valid result
    assert.equal(calc, expect);
});