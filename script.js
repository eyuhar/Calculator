
function add(num1, num2){
    return Math.round((Number(num1) + Number(num2)) * 1000) / 1000;
}

function subtract(num1, num2){
    return Math.round((Number(num1) - Number(num2)) * 1000) / 1000;
}

function multiply(num1, num2){
    return Math.round((Number(num1) * Number(num2)) * 1000) / 1000;
}

function divide(num1, num2){
    return Math.round((Number(num1) / Number(num2)) * 1000) / 1000;
}

function operate(num1, num2, operator){
    return operator(num1, num2);
}

//was the last input an equals-operator?
//used to avoid concatinating new numberInputs with last result
let equalsFlag = false;

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
const pointButton = document.getElementById("point");
const clearButton = document.getElementById("clearButton");
const operationScreen = document.getElementById("operationScreen");
const resultScreen = document.getElementById("resultScreen");


numberButtons.forEach(element => {
    element.addEventListener("click", processNumberInput);
});

function processNumberInput(e){
    if(resultScreen.innerHTML === "0" || equalsFlag === true){
        resultScreen.innerHTML = e.target.innerHTML;
        equalsFlag = false;
    }else if(resultScreen.innerHTML[resultScreen.innerHTML.length - 1] === "0" && e.target.innerHTML === "0"){
        let operation = resultScreen.innerHTML.split(" ");
        if(operation[operation.length - 1].includes(".")){
            resultScreen.innerHTML += "0";
        }else{
            return;
        }
    }else{
        resultScreen.innerHTML = resultScreen.innerHTML + e.target.innerHTML;
    }
}


operatorButtons.forEach(element => {
    element.addEventListener("click", processOperatorInput);
});

function processOperatorInput(e){
    if(isOperator(resultScreen.innerHTML[resultScreen.innerHTML.length - 1])){
        return;
    }

    if(containsOperator(resultScreen.innerHTML)){
        operationScreen.innerHTML = resultScreen.innerHTML + " =";
        let operation = resultScreen.innerHTML.split(" ");
        resultScreen.innerHTML = operate(operation[0], operation[2], translateOperator(operation[1])) + " " + e.target.innerHTML + " ";
    }else{
        resultScreen.innerHTML = resultScreen.innerHTML + " " + e.target.innerHTML + " ";
        equalsFlag = false;
    }
}

function isOperator(x){
    if(x === "+" || x === "-" || x === "x" || x === "/"){
        return true;
    }else{
        return false;
    }
}

function containsOperator(x){
    if(x.includes("+") || x.includes("-") || x.includes("x") || x.includes("/")){
        return true;
    }else{
        return false;
    }
}

function translateOperator(operatorString){
    let operator = null;
    switch (operatorString) {
        case "+":
            operator = add;
            break;
        case "-":
            operator = subtract;
            break;
        case "x":
            operator = multiply;
            break;
        case "/":
            operator = divide;
            break;
    }
    return operator;
}


equalsButton.addEventListener("click", processEqualsInput);

function processEqualsInput(){
    if(!containsOperator(resultScreen.innerHTML)){
        return;
    }else if(isOperator(resultScreen.innerHTML[resultScreen.innerHTML.length - 1])){
        return;
    }
    operationScreen.innerHTML = resultScreen.innerHTML + " =";
    let operation = resultScreen.innerHTML.split(" ");
    resultScreen.innerHTML = operate(operation[0], operation[2], translateOperator(operation[1]));
    equalsFlag = true;
}


pointButton.addEventListener("click", processPointInput);

function processPointInput(){
    if(isOperator(resultScreen.innerHTML[resultScreen.innerHTML.length - 1])){
        return;
    }
    let operation = resultScreen.innerHTML.split(" ");
    if(operation[operation.length - 1].includes(".")){
        return;
    }
    resultScreen.innerHTML += ".";
}


clearButton.addEventListener("click", processClearInput);

function processClearInput(){
    resultScreen.innerHTML = "0";
    operationScreen.innerHTML = "";
}


const allButtons = document.querySelectorAll("#buttons button, #clearButton");

allButtons.forEach(element =>{
    element.addEventListener("mousedown", e => {
        e.target.setAttribute("style", "border:4px solid black;");
    });
    element.addEventListener("mouseup", e => {
        e.target.setAttribute("style", "border:2px solid black;");
    });
});