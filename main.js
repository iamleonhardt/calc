var my_calculator = new calculator(callback);


// CLICK HANDLERS APPLIED
$(document).ready(function(){
    $('.buttons div').click(function(){
        var val = $(this).text();
        console.log('stuff');
        console.log("val : " + val);
        $('.screen').text(val);
        my_calculator.addItem(val);
    });
});

// CALLBACK FUNCTION
function callback (type, value, item){
    $('.screen').text(value)
}

