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



//----------------- LFZ Start
// FUNCTION FOR ADDING OPERATORS
// increase arrayPos, set value, increase position, clear position
//Create function called addOps that takes in the input from the operator button
function addOps(inputOps) {
    // An if statement that checks if the array position is greater than 0 AND whether it contains an empty string. Its checking to see if there was an operator in the previous array position and replacing the old operator with the new
    if (arrayPos > 0 && inputArray[arrayPos] == '') {
        // Console log to test if the array position is an empty string
        console.log("checking if inputArray[arrayPos] is empty string " + (inputArray[arrayPos] == ''));
        // Pop out last position of the array - removes the previous operator so the new one can replace it.
        inputArray.pop();
        // Console log to check array to verify if it removed previous
        console.log("Input Array is : " + inputArray + ", Array Position is : " + arrayPos);
        // Decrement array position
        arrayPos--;
        // Console log to check new position
        console.log("Array Position is : " + arrayPos);
        // Put the newly entered input operator into the current array position
        inputArray[arrayPos] = inputOps;
        // Run the function called displayResult to add the result to the screen
        displayResult();
        // Increment the Array position so that operators dont stack
        arrayPos++;
        // Add empty string to current array position so that its not undefined when a number is added
        inputArray[arrayPos] = '';
    //Close the if
    }
    // Create an else if statement to check if the array position is an empty string (if its an empty string we know its in the 0 position because the first "if" didnt catch it) 
    else if (inputArray[arrayPos] == '') {
        // Console log to check the array
        console.log(inputArray);
        // Return to kick out because we dont want an operator in the 0 position
        return;
    // Close the else if    
    }
    // Create an else statement that will add an operator in the next array position after a number is in the current array position        
    else {
        // Increment to the next array position so it doesnt overwrite number
        arrayPos++;
        // Assign the newly inputed operator into the current array position
        inputArray[arrayPos] = inputOps;
        // Run function called displayResult to add the result to the screen
        displayResult();
        // Increment the array position
        arrayPos++;
        // Set the current array position to be an empty string
        inputArray[arrayPos] = '';
        // Console log the array to validate
        console.log(inputArray);
    // Close the else statement    
    }
//Close the function
}
// Continue being excellent!
//------------------- LFZ End

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