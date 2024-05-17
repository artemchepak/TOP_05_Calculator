const display = document.querySelector('#display');
const digits = document.querySelectorAll('.digit');
const clearBtn = document.querySelector('#clear');
let displayText = display.innerHTML;

function getUserInput(key){
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

Array.from(digits).forEach(function (btn) {
    btn.addEventListener('click', (event) => {
        getUserInput(event.target);
    });
});

clearBtn.addEventListener('click', clear);