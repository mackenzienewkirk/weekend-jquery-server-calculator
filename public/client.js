$(document).ready(onReady);

function onReady() {
    $('.submitButton').on('click', submitCalculation);
    $('#clearButton').on('click', clearInputs);
}

let numberOne = '';
let numberTwo = '';
let operator = '';


function submitMath() {


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
    fetchResults();

    numberOne = '';
    numberTwo = '';
    operator = '';
}

function clearInputs() {
    
}