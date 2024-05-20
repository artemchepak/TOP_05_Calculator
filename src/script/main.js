//добавь кнопку equal и повесь на нее calculate

const display = document.querySelector('#display');
const digits = document.querySelectorAll('.digit');
const clearBtn = document.querySelector('#clear');
const operationBtns = document.querySelectorAll('.operation');
const equalBtn = document.querySelector('#equals');
let displayText = display.innerHTML;
let firstNumber = '';
let secondNumber = '';
let operation;
let result;

function getUserInput(key) {
    if (operation === undefined) {
        firstNumber += key.innerHTML;
        updateDisplay(key);
        console.log(`first number is ${firstNumber}`);
    }
    else {
        display.innerHTML = '';
        secondNumber += key.innerHTML;
        display.innerHTML = secondNumber;
        console.log(`second number is ${secondNumber}`);
    }
}

function getOperation(key) {
    operation = key.getAttribute('id');
}

function updateDisplay(key) {
    if (displayText === '0') {
        displayText = '';
    }
    else if (displayText.length === 15) {
        return;
    }
    displayText += key.innerHTML;
    display.innerHTML = displayText;
}

function clear() {
    displayText = '0';
    display.innerHTML = displayText;
    firstNumber = '';
    secondNumber = '';

}

function add() {
    return parseInt(firstNumber) + parseInt(secondNumber);
}

function subtract() {
    return parseInt(firstNumber) - parseInt(secondNumber);
}

function multiply() {
    return parseInt(firstNumber) * parseInt(secondNumber);
}

function divide() {
    return parseInt(firstNumber) / parseInt(secondNumber);
}

function calculate() {

    if (firstNumber === undefined || secondNumber === undefined) {
        return;
    }

    let result = '';

    switch (operation) {
        case 'divide':
            result = divide();
            break;
        case 'multiply':
            result = multiply();
            break;
        case 'subtract':
            result = subtract();
            break;
        case 'add':
            result = add();
            break;
    }

    display.innerHTML = result;
}

Array.from(digits).forEach(function (btn) {
    btn.addEventListener('click', (event) => {
        getUserInput(event.target);
    });
});

Array.from(operationBtns).forEach(function (btn) {
    btn.addEventListener('click', (event) => {
        getOperation(event.target);
    });
});

clearBtn.addEventListener('click', clear);
equalBtn.addEventListener('click', calculate);