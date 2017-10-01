// SET GLOBAL VARIABLES AND ARRAY
var inputArray = [''];
var arrayPos = 0;
var num1 = '';
var num2 = '';
var op = '';
var result = '';

$(document).ready(applyClicks);

function applyClicks() {
    // Select button, Add click that adds function of Adding digit (this buttons text)
    // NUMBERS .numButton
    $('.numButton').click(function () {
        addDigits($(this).text());
    });
    // DECIMAL #decimal
    $('.decimal').click(function () {
        addDec($(this).text());
    });
    // OPERATORS .arithButton
    $('.arithButton').click(function () {
        addOps($(this).text());
    });
    // CLEAR ENTRY #clearCE
    $('#clearCE').click(function () {
        addCE();
    });
    // CLEAR #clearC
    $('#clearC').click(function () {
        addC();
    });
    // ANSWER #equal
    $('#equal').click(function () {
        addAnswer();
    })
    // KEYBOARD INPUT TO BUTTONS
    $('body').keypress(keyboardPressed);

}

// Function for adding keyboard press to buttons
function keyboardPressed(event){
    var eWhich = event.which;
    var character = String.fromCharCode(eWhich);

    switch (event.which){
        case 13:
            character = '=';
            break;
        case 42:
            character = 'x';
            break;
    }

    var element = $("div[data-key='"+character+"']");
    console.log('element is : ', element);
    element.click();
}

// FUNCTION FOR ADDING DIGIT WHEN NUMBERS ARE PRESSED
// Take in number and add it to the array. Should be concat to other numbers previously pressed in the 0 position
function addDigits(inputDigit) {
    inputArray[arrayPos] += inputDigit;
    displayResult();
    console.log(inputArray);
}

// FUNCTION FOR ADDING OPERATORS
// increase arrayPos, set value, increase position, clear position
function addOps(inputOps) {
    // if an operator has already been pushed remove it and use new one
    if (arrayPos > 0 && inputArray[arrayPos] == '') {
        inputArray.pop();
        arrayPos--;
        inputArray[arrayPos] = inputOps;
        displayResult();
        arrayPos++;
        inputArray[arrayPos] = '';
        console.log(inputArray);
    }
    // if at first position and no numbers pushed, return
    else if (inputArray[arrayPos] == '') {
        console.log(inputArray);
        return;
    }
    else {
        arrayPos++;
        inputArray[arrayPos] = inputOps;
        displayResult();
        arrayPos++;
        inputArray[arrayPos] = '';
        console.log(inputArray);
    }
}

function addDec(inputDigit) {
    var posIndexString = inputArray[arrayPos];
    if (posIndexString.indexOf(".") == -1) {
        inputArray[arrayPos] += inputDigit;
        displayResult();
        console.log(inputArray);
    }
}

function addC() {
    inputArray = [''];
    arrayPos = 0;
    displayResult();
    console.log(inputArray);
}

function addCE() {
    //two separate things depending on the condition: if ''
    //if '' remove string and previous array location
    //if not set array pos to ''
    if (arrayPos == 0 && inputArray[arrayPos] == '') {
        displayResult();
        return;
    }

    if (inputArray[arrayPos] == '') {
        inputArray.splice(inputArray.length - 2, 2);
        if (arrayPos >= 2) {
            arrayPos -= 2;
            displayResult();
        }
        else {
            arrayPos = 0;
            displayResult();
        }
    }
    else {
        inputArray[arrayPos] = '';
        displayResult();
    }
    console.log(inputArray);
}

function assignNums() {
    num1 = parseFloat(inputArray[0]);
    num2 = parseFloat(inputArray[2]);
    op = inputArray [1];
    console.log("num1 = " + num1 + ", num2 = " + num2 + ", op = " + op);
}

function addAnswer() {
    // Check for Number and Operator
    if (inputArray.length == 1 && inputArray[0] == '') {
        $('.screen').text("0");
    }
    while (inputArray.length >= 2) {
        // Check if Two numbers and Operator
        if (inputArray.length >= 3 && inputArray[inputArray.length - 1] != '') {
            assignNums();
        }
        else {
            inputArray[2] = inputArray[0];
            assignNums();
        }
        doMath();
        inputArray[0] = result;
        inputArray.splice(1, 2);
        arrayPos -= 2;
        console.log("inputArray = " + inputArray);
    }
}

function doMath() {
    switch (op) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "/":
            if (num2 == 0) {
                result = "Error";
                break;
            }
            else {
                result = num1 / num2;
            }
            break;
        case "x":
            result = num1 * num2;
            break;
    }
    console.log(result);
    $('.screen').text(result);
}

function displayResult() {
    $('.screen').text(inputArray[arrayPos]);
}