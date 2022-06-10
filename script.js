function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}
// 演算子と数字２つを受取り、その計算結果を返す関数
function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    }
    if (operator === "-") {
        return subtract(a, b);
    }
    if (operator === "×") {
        return multiply(a, b);
    }
    if (operator === "÷") {
        return divide(a, b);
    }
}
// 演算子の前の数字
let firstNumber = "";
// 演算子のあとの数字
let lastNumber = "";
// 演算子
let operator = "";
// displayの中のh2要素を取得
const display = document.querySelector(".display");
const h2 = display.querySelector("#expression");

// 数字キーのイベントリスナー
let numbers = document.querySelectorAll(".number");
numbers.forEach(number => number.addEventListener("click", pressNumber));

// イコールキーのイベントリスナー
let equal = document.querySelector("#equal");
equal.addEventListener("click", pressEqual);

// 演算子キーのイベントリスナー
let operators = document.querySelectorAll(".operator");
operators.forEach(operator => operator.addEventListener("click", pressOperator));

// ACキーのイベントリスナー
let clear = document.querySelector("#clear");
clear.addEventListener("click", pressAllClear);

// ドットのイベントリスナー
let dot = document.querySelector("#dot");
dot.addEventListener("click", pressDot);

// マイナスキーのイベントリスナー
let minus = document.querySelector("#minus");
minus.addEventListener("click", pressMinus);

// 数字をクリックすると実行する関数
function pressNumber () {
    // クリックされた数字を取得
    let currentNumber = this.innerText;
    // operatorに演算子が入っていない場合、firstNumberの桁をそのまま増やし、画面に表示
    if (!operator) {
        firstNumber += currentNumber;
        h2.textContent = firstNumber;
    }
    // operatorに演算子が入っていた場合、演算子のあとの数字の桁を増やし、画面に表示
    if (operator) {
        lastNumber += currentNumber;
        h2.textContent = `${firstNumber} ${operator} ${lastNumber}`;
    }
}
// イコールが押されたとき実行される関数
function pressEqual () {
    // 演算子のあとの数字があれば、それまでの式を計算し結果を表示
    if (lastNumber) {
        firstNumber = operate(operator, Number(firstNumber), Number(lastNumber));
        h2.textContent = firstNumber;
        // firstNumber以外を初期化
        lastNumber = "";
        operator = "";
    }
}
// 演算子のキーが押されたときに実行される関数
function pressOperator() {
    // クリックされた演算子を取得
    let currentOperator = this.innerText;
    // firstNumberに数字があり、operator変数に演算子が入っていない場合、演算子を入れ、画面に表示
    if (firstNumber && !operator) {
        operator = currentOperator;
        h2.textContent = `${firstNumber} ${operator}`;
    }
    // lastNumberがある場合、それまでの式を計算し、その結果をfirstNumberに入れ、operator変数に演算子を入れる。このとき、firstNumberを画面に表示
    if (lastNumber) {
        firstNumber = operate(currentOperator, Number(firstNumber), Number(lastNumber));
        operator = currentOperator;
        h2.textContent = `${firstNumber} ${operator}`;
        // lastNumberを初期化
        lastNumber = "";
    }
}
// ACキーが押されたときの関数
function pressAllClear() {
    // lastNumber, firstNumber, operatorのすべてを空にし、表示されている式も消す
    lastNumber = "";
    firstNumber = "";
    operator = "";
    h2.textContent = "";
}
// ドットキーが押されたときの関数
function pressDot() {
    // firstNumberに数字があり、operatorに数字が入っていない場合,firstNumberの数字に少数点を追加し表示
    if (firstNumber && !operator) {
        firstNumber += ".";
        h2.textContent = firstNumber;
    }
    // lastNumberに数字がある場合、lastNumberに小数点を追加
    if (lastNumber) {
        lastNumber += ".";
        h2.textContent = `${firstNumber} ${operator} ${lastNumber}`;
    };
}
// マイナスキーが押されたときの関数
function pressMinus() {
    // firstNumberに数字があり、operatorに演算子が入っていない場合にfirstNumberにマイナスをつける
    if (firstNumber && !operator) {
        // マイナスが既についていた場合は取り除く
        if (firstNumber.includes("-")) {
            firstNumber = firstNumber.slice(1);
        } else {
            firstNumber = "-" + firstNumber;
        }
        h2.textContent = firstNumber;
    }
    // lastNumberに数字がある場合、lastNumberにマイナスをつける
    if (lastNumber) {
        if (lastNumber.includes("-")) {
            lastNumber = lastNumber.slice(1);
        } else {
            lastNumber = "-" + lastNumber;
        }
        h2.textContent = `${firstNumber} ${operator} ${lastNumber}`;
    }
}