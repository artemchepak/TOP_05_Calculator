const display = document.querySelector('#display');
const digits = document.querySelectorAll('.digit');
const decimalBtn = document.querySelector('#decimal');
const clearBtn = document.querySelector('#clear');
const operationBtns = document.querySelectorAll('.operation');
const equalBtn = document.querySelector('#equals');
const backspaceBtn = document.querySelector('#backspace');
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
        if (secondNumber === '') {
            displayText += value;
        }
        else {
            displayText = secondNumber;
        }
    }
    display.innerHTML = displayText;
    checkDecimalButton();
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
    checkDecimalButton();
}

function backspace() {
    if (displayText.length > 1) {
        displayText = displayText.slice(0, -1);
    } else {
        displayText = '0';
    }
    display.innerHTML = displayText;

    if (!operation) {
        firstNumber = displayText;
    } else {
        secondNumber = displayText;
    }
    checkDecimalButton();
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

    if (result.toString().length > 15) {
        displayText = result.toString().substring(0, 12) + 'err';
    } else {
        displayText = result.toString();
    }

    display.innerHTML = displayText;
    firstNumber = result.toString();
    secondNumber = '';
    operation = undefined;
    newCalculation = true;
    checkDecimalButton();
}

function checkDecimalButton() {
    if (displayText.includes('.')) {
        decimalBtn.disabled = true;
    } else {
        decimalBtn.disabled = false;
    }
}

digits.forEach(btn => {
    btn.addEventListener('click', event => getUserInput(event.target));
});

operationBtns.forEach(btn => {
    btn.addEventListener('click', event => getOperation(event.target));
});

clearBtn.addEventListener('click', clear);
backspaceBtn.addEventListener('click', backspace);
equalBtn.addEventListener('click', calculate);

// Decimal button event listener
decimalBtn.addEventListener('click', event => {
    if (!displayText.includes('.')) {
        getUserInput(event.target);
    }
});

// Initial check to set decimal button state
checkDecimalButton();
