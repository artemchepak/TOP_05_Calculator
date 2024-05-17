const display = document.querySelector('#display');
const digits = document.querySelectorAll('.digit');
const clearBtn = document.querySelector('#clear');
const operationBtns = document.querySelectorAll('.operation');
let displayText = display.innerHTML;
let firstNumber = '';
let secondNumber = '';
let operation;
let result;

function getUserInput(key) {
    if (operation === undefined) {
        firstNumber += parseInt(key.innerHTML);
        updateDisplay(key);
        console.log(`first number is ${firstNumber}`);
    }
    else {
        clear();
        secondNumber += parseInt(key.innerHTML);
        display.innerHTML = secondNumber;
        console.log(`second number is ${secondNumber}`);
    }
}

function getOperation(key) {
    operation = key.getAttribute('id');

    switch (operation) {
        case 'divide':
            console.log('divide');
            break;
        case 'multiply':
            console.log('multiply');
            break;
        case 'subtract':
            console.log('subtract');
            break;
        case 'add':
            console.log('add');
            break;
    }
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
}

function add() {

}

function subtract() {

}

function multiply() {

}

function divide() {

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