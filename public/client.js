$(document).ready(onReady);

function onReady() {
    console.log('This is the onReady');
    $('.submitButton').on('click', submitCalculation);
    $('#clearButton').on('click', clearInputs);
    getResults();
}

let numberOne = '';
let numberTwo = '';
let operator = '';


function submitMath() {
console.log('a submitMath function to send the inputs to the servers');

    calculatorInfo = {
        numberOne: numberOne,
        type: operator,
        numberTwo: numberTwo,
        result: 'empty',
    }

    console.log(calculatorInfo);
    $.ajax({
        method: 'POST',
        url: '/submit',
        data: calculatorInfo,
    }).then(function (results) {
        console.log(results);
    })
    getResults();

    numberOne = '';
    numberTwo = '';
    operator = '';
}

function typeOfOperator() {
    if (operator === '') {
    numberOne.slice(0,-1);
    
    numberOne = $('.calculator').text();
    console.log(valueOne);
    }
    operation = $(this).text();
    console.log(operation);
    return operator;
}


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


function clearInputs() {
    $('#numberOne').val('');
    $('#numberTwo').val('');
    operation = '';

}
