// IMPORT MODULES under test here:
// import example from '../src/example.js';
import { findById, calcLineItem } from '../common/utils.js';
import boxes from '../data/boxes.js';
import cart from '../data/cart.js';

const test = QUnit.test;

test('test findById', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const expect = {
        id: 'average',
        name: 'Average Box',
        image: 'averagebox.jpg',
        color: 'brown',
        description: 'Our best selling box!',
        category: 'boxes',
        price: 5.00,
        sale: 4.00
    };
    
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