function notEval(str) {

}

function checkBrackets(line) {
    let arr = line.match(/[()]/g),
        obj = {')': '('}, 
        stack = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == '(') {
            stack.push(arr[i]);
        } else {
            if (stack[stack.length - 1] == obj[arr[i]]) {
                stack.pop();
            } else {
                throw new Error("ExpressionError: Brackets must be paired");
            }
        }
    }
    if (stack.length != 0) {
        throw new Error("ExpressionError: Brackets must be paired");
    }
}
function calc(num1, num2, operator) {
    if (operator == '/' && num2 == '0') {
        throw new Error("TypeError: Division by zero.");
    }
    switch(operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '/':
            return num1 / num2;
        case '*':
            return num1 * num2;    
    }
}
function mainCalc(arr) {
    let x = 0,
        y = 0,
        operator = '';

    x = arr[0];
    for(let i = 1; i < arr.length; i++) {
        if (/[\+\-]/.test(arr[i]) && arr[i].length == 1) {
            if(operator == '') {
                operator = arr[i];
                y = arr[i + 1];
            } else {
                x = calc(+x,+y,operator);
                operator = arr[i];
                y = arr[i + 1];
            }
        }
        if (/[\*\/]/.test(arr[i])) {
            if(operator == '') {
                x = calc(+x,+arr[i + 1],arr[i]);
            } else {
                y = calc(+y,+arr[i + 1],arr[i]);
            }
        }
    }
    if (operator != '') {
        x = calc(+x,+y,operator);
    }
    return +x;
}
function noBrackets(arr) {
    let result = 0;
    let subArr = [];
    arr.push(')');
    arr.unshift('(');

    for (let i = 0; arr.length > 1; i++) {
        if (arr[i] === ')') {
            let j = i - 1;
            while (arr[j] !== '(') {
                j--;
            }
            subArr = arr.splice(j + 1,i - j - 1);
            result = mainCalc(subArr);
            arr.splice(j, 2, result);
            i = 1;
        }
    }

    return +arr[0];
}

function expressionCalculator(expr) {
    let result = 0;
    let arr = expr.match(/\+|-|\*|\/|\d+|\(|\)/g);
    if(/[()]/.test(expr)) {
        checkBrackets(expr);
        result = noBrackets(arr);
    } else {
        result = mainCalc(arr);
    }
     
    return +result;
}

module.exports = {
    expressionCalculator
};