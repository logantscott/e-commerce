// IMPORT MODULES under test here:
// import example from '../src/example.js';
import boxes from '../data/boxes.js';
import { updateBoxes } from '../common/utils.js';

const test = QUnit.test;

test('test add new product', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const seed = boxes;
    const newBox = {
        id: 'fancy',
        name: 'Fancy Box',
        image: '../assets/fancybox.jpg',
        color: null,
        description: 'Default descrip lol.',
        category: null,
        price: 12.00,
        sale: 11.00
    };

    localStorage.setItem('CART', seed);
    
    seed.push(newBox);

    const expect = seed;
    
    //Act 
    // Call the function you're testing and set the result to a const

    updateBoxes(newBox);

    const result = localStorage.getItem('CART');

    //Assert
    // Make assertions about what is expected valid result
    assert.deepEqual(result, expect);
});