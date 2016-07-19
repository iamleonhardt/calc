// SET GLOBAL VARIABLES AND ARRAY
var inputArray = [''];
var arrayPos = 0;
var num1 = '';
var num2 = '';
var op = '';
var result = '';


// DOC READY - 4 FUNCTIONS - .NUMBERS, .OPERATORS, .SPECIAL, .ANSWER BUTTONS
$(document).ready(applyClicks);

function applyClicks() {
    // Select button, Add click that adds function of Adding digit (this buttons text)
    // NUMBERS .numButton
    $('.numButton').click(function () {
        addDigits($(this).text());
    });
    // KEYBOARD INPUT TO BUTTONS
    $('body').keypress(keyboardPressed);
    
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
    });
};

// Function for adding keyboard press to buttons
function keyboardPressed(event){
    var keycode = event.which;
    var letter = String.fromCharCode(keycode);
    console.log("Keycode is : " + keycode);
    var element = $("div[data-key="+letter+"]");
    element.click();
}


// FUNCTION FOR ADDING DIGIT WHEN NUMBERS ARE PRESSED
// Take in number and add it to the array. Should be concat to other numbers previously pressed in the 0 position
function addDigits(inputDigit) {
    inputArray[arrayPos] += inputDigit;
    console.log(inputArray);
    // SHOW IN DISPLAY
    displayResult();
}


// FUNCTION FOR ADDING OPERATORS
// increase arrayPos, set value, increase position, clear position
function addOps(inputOps) {
    if (arrayPos > 0 && inputArray[arrayPos] == '') {
        console.log("checking if inputArray[arrayPos] is empty string " + (inputArray[arrayPos] == ''));
        inputArray.pop();
        console.log(inputArray);
        console.log("Array Position is : " + arrayPos);
        arrayPos--;
        console.log("Array Position is : " + arrayPos);
        inputArray[arrayPos] = inputOps;
        displayResult();
        arrayPos++;
        inputArray[arrayPos] = '';
    }
    else if (inputArray[arrayPos] == '') {
        console.log(inputArray);
        return;
    }
    else
    {
        arrayPos++;
        inputArray[arrayPos] = inputOps;
        // SHOW IN DISPLAY
        displayResult();
        arrayPos++;
        inputArray[arrayPos] = '';
        console.log(inputArray);
    }
}


//FUNCTION FOR ADDING DECIMALS
function addDec(inputDigit) {
    var posIndexString = inputArray[arrayPos];
    console.log(posIndexString);
    if (posIndexString.indexOf(".") == -1) {
        inputArray[arrayPos] += inputDigit;
        console.log(inputArray);
        displayResult();
    }
}


// FUNCTION FOR ADDING CLEARS
// Clear
function addC() {
    inputArray = [''];
    arrayPos = 0;
    console.log(inputArray);
    displayResult();
}
// Clear entry
function addCE() {
    //two separate things depending on the condition. condition: if ''
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
        // inpArrayPos = inputArray[arrayPos];
        // inpArrayPos = inpArrayPos.slice(0, inpArrayPos.length-1);
    }
    console.log(inputArray);
}

// FUNCTION FOR ANSWER BUTTON
function assignNums() {
    num1 = parseFloat(inputArray[0]);
    num2 = parseFloat(inputArray[2]);
    op = inputArray [1];
    console.log("num1 = " + num1 + ", num2 = " + num2 + ", op = " + op);
};


function addAnswer() {
    // var hold = "";
    // Check for Number and Operator
    if (inputArray.length == 1 && inputArray[0] == '') {
        $('.screen').text("0");
    }
    // Trying to use var hold to add operator when you hit =
    // if (inputArray.length == 1 && inputArray[0] != NaN) {
    //
    // }
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
        // if (inputArray.length == 3){
        //     inputArray[0] = result;
        //     console.log("inputArray[0] = " + inputArray[0]);
        //     console.log("inputArray = " + inputArray);
        //     hold = inputArray[1] + inputArray[2];
        //     inputArray.splice(2,1);
        //     arrayPos -= 1;
        //     console.log("inputArray = " + inputArray);
        // }
        // else {
        inputArray[0] = result;
        console.log("inputArray[0] = " + inputArray[0]);
        console.log("inputArray = " + inputArray);
        inputArray.splice(1, 2);
        arrayPos -= 2;
        console.log("inputArray = " + inputArray);
    }
};

// DO MATH
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

// FUNCTION FOR SHOWING DISPLAY
function displayResult() {
    $('.screen').text(inputArray[arrayPos]);
}