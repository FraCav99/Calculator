const calculator = document.querySelector('.calculator');
const calcDisplay = calculator.querySelector(".calc-display #display");

const calcExpression = calculator.querySelector(".calc-display .current-expression")
let calcExpressionNum1 = calcExpression.querySelector("#num1");
let calcExpressionOp = calcExpression.querySelector("#operator");
let calcExpressionNum2 = calcExpression.querySelector("#num2");

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
    calcExpressionNum1.textContent = "";
    calcExpressionNum2.textContent = "";
    calcExpressionOp.textContent = "";
}

const setOperation = operation => {
    operator = operation;
    calcExpressionOp.textContent = operator;

    if (calcDisplay.placeholder !== "") {
        if (num1 === "") {
            calcExpressionNum1.textContent = calcDisplay.placeholder;
            calcExpressionNum2.textContent = "";
            num1 = Number(calcDisplay.placeholder);
            clearEntry();
            removeActiveClasses();
        }
    }
}

const calcResult = () => {
    if (calcDisplay.placeholder !== "" && num1 !== "") {
        calcExpressionNum2.textContent = calcDisplay.placeholder;
        num2 = Number(calcDisplay.placeholder);
        clearEntry();
        removeActiveClasses();
        operate(operator, num1, num2);
    }
}

const makePosNeg = () => {
    if (calcDisplay.placeholder !== "") {
        calcDisplay.placeholder = Number(calcDisplay.placeholder) * -1;
    }
}

function removeActiveClasses() {
    let operationsBtn = calcBtnContainer.querySelectorAll(".operation");

    for (let operationBtn of operationsBtn) {
        let span = operationBtn.querySelector("span");
        operationBtn.classList.remove("active-element");
        span.classList.remove("current-operation");
    }
}

calcBtnContainer.addEventListener('click', e => {
    let buttonEl = e.target;
    let buttonVal = buttonEl.value;

    if (buttonEl.classList.contains("digit")){
        showOnDisplay(buttonVal);
    }

    if (buttonEl.classList.contains("operation")) {
        let currentSpan = buttonEl.querySelector("span");
        removeActiveClasses();

        currentSpan.classList.add("current-operation");
        buttonEl.classList.add("active-element");
        setOperation(buttonVal);
    }

    buttonVal === "+/-" ? makePosNeg() : null;
    buttonVal === "=" ? calcResult() : null;
    buttonVal === "AC" ? clearAll() : null;
    buttonVal === "C" ? clearEntry() : null;
});


document.addEventListener('keydown', e => {
    const operators = ["+", "-", "*", "^", "/"];

    if (isNaN(Number(e.key))) {
        if (e.key === ".") {
            if (!calcDisplay.placeholder.includes(".") && calcDisplay.placeholder !== "") {   // avoid extra dots
                calcDisplay.placeholder += ".";
            }
        }
    } else {
        showOnDisplay(e.key);
    }

    e.key === "Backspace" ? clearEntry() : null;

    // Check for combination of keys (shift + *, etc...)
    if (operators.includes(e.key)) {
        let operationsBtn = calcBtnContainer.querySelectorAll(".operation");

        removeActiveClasses();

        for (let operationBtn of operationsBtn) {
            if(operationBtn.value === e.key) {
                let span = operationBtn.querySelector("span");
                operationBtn.classList.add("active-element");
                span.classList.add("current-operation");
                break;
            }
        }
    }

    operators.includes(e.key) ? setOperation(e.key) : null;
    e.key === "Enter" ? calcResult() : null;
});