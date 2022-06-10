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
let clearAll = document.querySelector("#clear-all");
clearAll.addEventListener("click", pressAllClear);

// ドットのイベントリスナー
let dot = document.querySelector("#dot");
dot.addEventListener("click", pressDot);

// マイナスキーのイベントリスナー
let minus = document.querySelector("#minus");
minus.addEventListener("click", pressMinus);

// クリアーキーのイベントリスナー
let clear = document.querySelector("#clear");
clear.addEventListener("click", pressClear);
// 数字をクリックすると実行する関数
function pressNumber () {
    // 12桁以上の数字が入力された場合は警告メッセージを表示し、入力できないようにする
    if (firstNumber.length > 12 || lastNumber.length > 12) {
        window.alert("Numbers over 12 digits are not accepted.");
        return;
    }
    // クリックされた数字を取得
    let currentNumber = this.innerText;

    // operatorに÷が入っていて, lastNumberがないときは０を入力させない
    if (operator === "÷" && !lastNumber && currentNumber === "0") {
        return;
    }
    // 
    // operatorに演算子が入っていない場合、firstNumberの桁をそのまま増やし、画面に表示
    if (!operator) {
        //firstNumberが０のときはfirstNumberに現在の数字を直接代入
        if (firstNumber === "0") {
            firstNumber = currentNumber;            
        } else {
            firstNumber += currentNumber;
        }
        h2.textContent = firstNumber;       
    }
    // operatorに演算子が入っていた場合、演算子のあとの数字の桁を増やし、画面に表示
    if (operator) {
        // lastNumberが０のときはlastNumberに現在の数字を直接代入
        if (lastNumber === "0") {
            lastNumber = currentNumber;
        } else {
            lastNumber += currentNumber;
        }
        h2.textContent = `${firstNumber} ${operator} ${lastNumber}`;
    }
}
// イコールが押されたとき実行される関数
function pressEqual () {
    // 演算子のあとの数字があれば、それまでの式を計算し結果を文字に変換し表示
    if (lastNumber) {
        firstNumber = String(operate(operator, Number(firstNumber), Number(lastNumber)));
        h2.textContent = String(firstNumber);
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
    // lastNumberがある場合、それまでの式を計算し、その結果を文字に変換しfirstNumberに入れ、operator変数に演算子を入れる。このとき、firstNumberを画面に表示
    if (lastNumber) {
        firstNumber = String(operate(currentOperator, Number(firstNumber), Number(lastNumber)));
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
    //　firstNumberが０のときはマイナスはつけない
    if (firstNumber === "0" || lastNumber === "0") return;
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
        // 既にマイナスがついていれば取り除く
        if (lastNumber.includes("-")) {
            lastNumber = lastNumber.slice(1);
        } else {
            lastNumber = "-" + lastNumber;
        }
        h2.textContent = `${firstNumber} ${operator} ${lastNumber}`;
    }
}

function pressClear() {
    // firstNumberだけ数字があるとき
    if (firstNumber && !operator) {
        firstNumber = firstNumber.slice(0, firstNumber.length - 1);
        h2.textContent = firstNumber;
    }
    // 演算子まであるとき
    if (operator && !lastNumber) {
        operator = ""
        h2.textContent = firstNumber;
    }
    // lastNumberまで数字があるとき
    if (lastNumber) {
        lastNumber = lastNumber.slice(0, lastNumber.length - 1);
        h2.textContent = `${firstNumber} ${operator} ${lastNumber}`;
    }
}