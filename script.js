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
let firstNumber;
// 演算子のあとの数字
let lastNumber;
// 演算子
let operator;

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

// パーセントキーのイベントリスナー
let percent = document.querySelector("#percent");
percent.addEventListener("click", pressPercent);

// 数字をクリックすると実行する関数
function pressNumber () {
    // 演算子変数に演算子が入っていない場合、演算子の前の数字の桁をそのまま増やす
    // 演算子変数に演算子が入っていた場合、演算子のあとの数字の桁を増やす
    const div = document.createElement("div");
    div.innerText = this.innerText;
    const display = document.querySelector(".display"); 
    display.appendChild(div);
}
// イコールが押されたとき実行される関数
function pressEqual () {
    // 演算子のあとの数字があれば、それまでの式を計算し結果を表示
}
// 演算子のキーが押されたときに実行される関数
function pressOperator() {
    // firstNumberに数字があり、operator変数に演算子が入っていない場合、演算子を入れる
    // lastNumberがある場合、それまでの式を計算し、その結果をfirstNumberに入れ、operator変数に演算子を入れる。このとき、firstNumberを画面に表示
}
// ACキーが押されたときの関数
function pressAllClear() {
    // lastNumber, firstNumber, operatorのすべてを空にする

}
// ドットキーが押されたときの関数
function pressDot() {
    // firstNumberに数字があり、operatorに数字が入っていない場合,firstNumberの数字に少数点を追加

    // lastNumberに数字がある場合、lastNumberに小数点を追加
}
// パーセントキーが押されたときの関数
function pressPercent() {
    // firstNumberに数字があり、operatorに演算子が入っていない場合にfirstNumberを１００分の１にする

    // lastNumberに数字がある場合、lastNumberの数字を１００分の１にする
}