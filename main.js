// SET GLOBAL VARIABLES AND ARRAY
var inputArray = [''];
var arrayPos = 0;


// DOC READY - 4 FUNCTIONS - .NUMBERS, .OPERATORS, .SPECIAL, .ANSWER BUTTONS
$(document).ready(applyClicks);

function applyClicks() {
    // Select button, Add click that adds function of Adding digit (this buttons text)
    // NUMBERS .numButton
    $('.numButton').click(function () {
        addDigits($(this).text());
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
    if (inputArray[arrayPos] == '') {
        console.log("checking if inputArray[arrayPos] is empty string " + (inputArray[arrayPos] == ''));
        return;
    }
    else {
        arrayPos++;
        inputArray[arrayPos] = inputOps;
        // SHOW IN DISPLAY
        displayResult();
        arrayPos++;
        inputArray[arrayPos] = '';
        console.log(inputArray);
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
function assignNums(){
    var num1 = inputArray[0];
    var num2 = inputArray[2];
    var op = inputArray [1];
    console.log("num1 = " + num1 + ", num2 = " + num2 + ", op = " + op);
};


function addAnswer() {
    // Check for Number and Operator
    if (inputArray.length >= 2) {
        // Check if Two numbers and Operator
        if (inputArray.length >= 3) {  // add && != ''
            assignNums();
        }
        else {
            inputArray[2] = inputArray[0];
            assignNums();
        }
    }
    else {
        return;
    }
};


    // var answer = num1 + op + num2;
    // console.log(answer);



// FUNCTION FOR SHOWING DISPLAY
function displayResult() {
    $('.screen').text(inputArray[arrayPos]);
}