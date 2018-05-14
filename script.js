const calculator = document.querySelector('.calculator');
const digits = calculator.querySelector('.digits');
const operators = calculator.querySelector('.operators');
const equals = calculator.querySelector('.eq');
const display = calculator.querySelector('.display');

let toEval = "";

// Event handler for digits, decimal and clear button
digits.addEventListener('click', e => {
    const pressed = e.target;
    const action = pressed.dataset.action;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType
    const content = pressed.textContent;
    // logic for integer keys
    if (!action) {

        if (calculator.dataset.previousKeyType === 'equals') {
            calculator.dataset.secondValue = '0';
        }
        // // clear calculation values on digit press if the equals key was just hit
        // if (calculator.dataset.EqualsPressed === 'y') {
        //     calculator.dataset.firstValue = '0';
        //     calculator.dataset.secondValue = '0';
        //     calculator.dataset.EqualsPressed === 'n'
        // } 
        if( displayedNum === '0' || calculator.dataset.previousKeyType === 'operator' || calculator.dataset.previousKeyType === 'equals') {
            
            display.textContent = content;
            calculator.dataset.previousKeyType = 'digit';
            calculator.dataset.EqualsPressed === 'n';          
        } else {
            display.textContent += content; 
            calculator.dataset.previousKeyType = 'digit';          
        }      
    }

    // Logic for decimal key
    if (action === 'decimal' ) {
 
        // logic for appending decimal key to appropriate cases
        if (display.textContent === '0' || calculator.dataset.previousKeyType === 'operator' || calculator.dataset.previousKeyType === 'digit') {
            display.textContent = '0.';
            calculator.dataset.previousKeyType = 'decimal';
        } else if (!display.textContent.includes('.')) {
            display.textContent += '.';
            // calculator.dataset.previousKeyType = 'decimal';
        }       
    }

    // Change All clear to clear entry once a non clear button is hit
    if (action !== 'clear') {
        const clearBtn = calculator.querySelector('[data-action="clear"]');
        clearBtn.textContent = 'CE';
    }
    
    // Logic for clear key
    if (action === 'clear') {
        
        if (pressed.textContent === 'AC' || calculator.previousKeyType === 'equals') {
            calculator.dataset.firstValue = 0;
            calculator.dataset.secondValue = 0;
            calculator.dataset.previousKeyType = '';
        }

        display.textContent = 0;
        calculator.dataset.secondValue = 0;
        pressed.textContent = 'AC';  
    }
    calculator.dataset.previousKeyType = 'clear';
    console.log('first: '+ calculator.dataset.firstValue);
    console.log('second: ' + calculator.dataset.secondValue);
});

// Event handler for operators 
operators.addEventListener('click', e => {
    const first = calculator.dataset.firstValue;
    const second = display.textContent;
    const operator = calculator.dataset.operator;
    const pressed = e.target;
  

    calculator.dataset.firstValue = display.textContent;
    
    // assign operator to the data-action attribute of the key that was pressed
    calculator.dataset.operator = pressed.dataset.action;


    if (first && 
        operator &&
        calculator.dataset.secondValue !== '0' &&
        calculator.dataset.previousKeyType !== 'operator' &&
        calculator.dataset.previousKeyType !== 'equals') {
        console.log('calculate values being reassigned...')
        calculator.dataset.secondValue = second;    
        display.textContent = calculate (first, operator, second);
        calculator.dataset.firstValue = display.textContent;
    }
    calculator.dataset.previousKeyType = 'operator';
    console.log(calculator.dataset.firstValue);
});


// event handler for calculate button
equals.addEventListener('click', () => {
    const firstValue = calculator.dataset.firstValue
    const secondValue = display.textContent;

    // fixes calculation error when user hits equals key multiple times
    if (calculator.dataset.previousKeyType !== 'equals') {
        calculator.dataset.secondValue = secondValue;
    }
    
    display.textContent = calculate(firstValue, calculator.dataset.operator, calculator.dataset.secondValue); 
    
    // refresh first value with the new total
    calculator.dataset.firstValue = display.textContent;
    calculator.dataset.EqualsPressed = 'y';
    calculator.dataset.previousKeyType = 'equals';
});

const calculate = (first, operator, second ) => {
    console.log('calculating...');
    console.log('first: ' + first);
    console.log(operator);
    console.log('second: ' + second);
    // perform calculation
    let result = '';
    if (operator === 'add') {
        result = parseFloat(first) + parseFloat(second);
    } else if (operator === 'subtract') {
        result = parseFloat(first) - parseFloat(second);
    } else if ( operator === 'multiply') {
        result = parseFloat(first) * parseFloat(second);
    } else if (operator === 'divide') {
        result = parseFloat(first) / parseFloat(second);
    }
    // fix empty string bug
    if (result === "") result = 0;
    // fix numbers appending to result after calculation
    
    return result;
}
