$(document).ready(onReady);

//an onReady function when the browser is ready.
function onReady() {
    console.log('This is the onReady');
    clickHandlers();
    getResults();
}

//a clickHandlers function to active the buttons and inputs on the browser.
function clickHandlers() {
    $('.submitButton').on('click', submitMath);
    $('#clearButton').on('click', clearInputs);
    $('#addButton').on('click', typeOfOperator);
    $('#subtractButton').on('click', typeOfOperator);
    $('#multiplyButton').on('click', typeOfOperator);
    $('#divideButton').on('click', typeOfOperator);
    submitMath();
}

let numberOne = '';
let numberTwo = '';
let operator = '';

//a submitMath function to send input info to the server.
function submitMath() {
console.log('a submitMath function to send the inputs to the servers');

//an object of the calculator info to send to the server to be put in the history array.
let calculatorInfo = {
        numberOne: Number(numberOne),
        numberTwo: Number(numberTwo),
        type: operator,
    }

    $.ajax({
        method: 'POST',
        url: '/submit',
        data: calculatorInfo,
    }).then(function (results) {
        console.log(results);
    })
    getResults();

}

// //a function to determine which operator was used in between the number inputs.
function typeOfOperator() {
    if (operator === '') {
    numberOne.slice(0,-1);
    
    numberOne = $('.calculator').text();
    console.log(numberOne);
    }
    operation = $(this).text();
    console.log(operation);
    return operator;
}

//a function to append and empty the input values in the calculator.
function inputCompiler() {
    if (operator === '') {
    numberOne = numberOne + $(this).attr('id');
    console.log(numberOne);

    $('.calculator').empty();
    $('.calculator').append(numberOne);
    } else {
    numberTwo += $(this).attr('id')

    console.log(numberTwo);
    $('.calculator').empty();
    $('.calculator').append(numberTwo);

    }
}

//a function to get the results of the calculator back from the server
function getResults() {
    $.ajax({
        method: 'GET',
        url: '/submit',
    }).then(function (history) {
    console.log(history);
    renderResults(history);
    })
}

//a function to render the most recent results recieved from the server.js.
function renderResults() {
    $('#history').empty();
    let last = history[history.length - 1];
    for (let i = history.length - 1; i >= 0; i--) {
    $('#history').append(`
    <li> ${history[i].numberOne} ${history[i].type} ${history[i].numberTwo} = ${history[i].result}  </li>
    `);
    console.log('appended');
    $('.calculator').text(`${last.result}`);
    }

}
console.log('appended');

//a function to clear all elements of the calculator when the clear 'c' button is clicked.
function clearInputs() {
    $('#numberOne').val('');
    $('#numberTwo').val('');
    operation = '';

}
