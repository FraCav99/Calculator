const calculator = document.querySelector('.calculator');
const calcDisplay = calculator.querySelector(".calc-display #display");
const calcBtnContainer = calculator.querySelector(".buttons");

let operator = "";  // hold the current operator value
let num1 = "";      // hold the first number
let num2 = "";      // hold the second number
let currentResult;  // it's used to not modify the current entry on display after calculation

const add = (x, y) => x + y;
const sub = (x, y) => x - y;
const mul = (x, y) => x * y;
const pow = (x, y) => x ** y;
const div = (x, y) => {
    if (y === 0) {
        alert ("Can't divide by zero!");
        clearAll(); // reset all values
        return;
    } else {
        return x / y;
    }
}

const operate = (operation, a, b) => {
    let result;

    switch (operation) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = sub(a, b);
            break;
        case "*":
            result = mul(a, b);
            break;
        case "^":
            result = pow(a, b);
            break;
        case "/":
            result = div(a, b);
            break;
        default:
            break;
    }

    // prevent "undefined" displayed on screen
    if (result !== undefined) {
        calcDisplay.placeholder += result;
    }

    num1 = "";
    num2 = "";
    operator = "";
    currentResult = String(result);
}

const showOnDisplay = digit => {
    if (calcDisplay.placeholder !== currentResult) {    // can't type after calculation
        if (digit === ".") {
            if (!calcDisplay.placeholder.includes(digit) && calcDisplay.placeholder !== "") {   // avoid extra dots
                calcDisplay.placeholder += digit;
            }
        } else {
            calcDisplay.placeholder += digit;
        }
    }
}

function clearEntry () {
    calcDisplay.placeholder = "";
}

function clearAll() {
    num1 = "";
    num2 = "";
    operator = "";
    calcDisplay.placeholder = "";
}

const setOperation = operation => {
    operator = operation;

    if (calcDisplay.placeholder !== "") {
        if (num1 === "") {
            num1 = Number(calcDisplay.placeholder);
            clearEntry();
        }
    }
}

const calcResult = () => {
    if (calcDisplay.placeholder !== "" && num1 !== "") {
        num2 = Number(calcDisplay.placeholder);
        clearEntry();
        operate(operator, num1, num2);
    }
}

calcBtnContainer.addEventListener('click', e => {
    let buttonEl = e.target;
    let buttonVal = buttonEl.value;

    if (buttonEl.classList.contains("digit")) showOnDisplay(buttonVal);
    if (buttonEl.classList.contains("operation")) setOperation(buttonVal);

    buttonVal === "=" ? calcResult() : null;
    buttonVal === "AC" ? clearAll() : null;
    buttonVal === "C" ? clearEntry() : null;
});