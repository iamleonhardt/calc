var my_calculator = new calculator(callback);


// CLICK HANDLERS APPLIED
$(document).ready(function(){
    $('.buttons div').click(function(){
        var val = $(this).text();
        $('.screen').text(val);

        switch (val) {
            case 'c':
                my_calculator.clear();
                break;
            case 'ce':
                my_calculator.allClear();
                break;
            default:
                my_calculator.addItem(val);
                break;
        }
    });
});

// CALLBACK FUNCTION
function callback (type, value, item){
    $('.screen').text(value)
}

