const display = document.querySelector('#display');
const digits = document.querySelectorAll('.digit');
const clearBtn = document.querySelector('#clear');
const operationBtns = document.querySelectorAll('.operation');
const equalBtn = document.querySelector('#equals');
let displayText = '0';
let firstNumber = '';
let secondNumber = '';
let operation;
let newCalculation = false;

function updateDisplay(value) {
    if (displayText === '0' || newCalculation) {
        displayText = value;
        newCalculation = false;
    } else if (displayText.length < 15) {
        if (secondNumber === ''){
            displayText += value;
        }
        else {
            displayText = secondNumber;
        }
    }
    display.innerHTML = displayText;
}

function getUserInput(key) {
    const value = key.innerHTML;
    if (!operation) {
        if (newCalculation) {
            firstNumber = '';
            newCalculation = false;
        }
        firstNumber += value;
        updateDisplay(value);
    } else {
        if (!secondNumber && displayText !== firstNumber) {
            displayText = '';
        }
        secondNumber += value;
        updateDisplay(value);
    }
}

function getOperation(key) {
    if (firstNumber) {
        if (secondNumber) {
            calculate();
        }
        operation = key.id;
        displayText = firstNumber;
        newCalculation = false;
    }
}

function clear() {
    displayText = '0';
    display.innerHTML = displayText;
    firstNumber = '';
    secondNumber = '';
    operation = undefined;
    newCalculation = false;
}

function calculate() {
    if (!firstNumber || !secondNumber || !operation) return;

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    let result;

    switch (operation) {
        case 'divide':
            result = num1 / num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'add':
            result = num1 + num2;
            break;
    }

    displayText = result.toString();
    display.innerHTML = displayText;
    firstNumber = result.toString();
    secondNumber = '';
    operation = undefined;
    newCalculation = true;
}

digits.forEach(btn => {
    btn.addEventListener('click', event => getUserInput(event.target));
});

operationBtns.forEach(btn => {
    btn.addEventListener('click', event => getOperation(event.target));
});

clearBtn.addEventListener('click', clear);
equalBtn.addEventListener('click', calculate);
