$(document).ready(onReady);

//an onReady function when the browser is ready.
function onReady() {
    console.log('this is the onReady function!');
    $('.operatorButton').on('click', onOperatorClick)
    $('#equalsButton').on('click', onEqualsClick);
    $('#clearButton').on('click', resetCalculator);
}

function getAndRenderCalculations() {
    $.ajax({
        method: 'GET',
        url: '/calculations'
    }).then((calculationsFromServer) => {
    let mostRecentCalc = calculationsFromServer[calculationsFromServer.length - 1];
    $('#mostRecentCalculation').text(mostRecentCalc.result)

    $('#allTheCalculations').empty();
    for (let aCalc of calculationsFromServer) {
        $('#allTheCalculations').append(`
        <li>${aCalc.numOne} ${aCalc.operator} ${aCalc.numTwo} = ${aCalc.result}</li>
        `)
    }
    })
}

// //a function to determine which operator was used in between the number inputs.
function typeOfOperator() {
    operator = $(this).text();
}

function onEqualsClick() {
    //get values from number inputs//
    let numOne = $('#numberOne').val();
    let numTwo = $('#numberTwo').val();

    let newCalculation = {
        numOne: numOne,
        numTwo: numTwo,
        operator: operator
    }
    
    $.ajax({
    method: 'POST',
    url: '/calculations',
    data: newCalculation
    }).then((response) => {
    clearInputs();
    getAndRenderCalculations();
    })
}



//a function to clear all elements of the calculator when the clear 'c' button is clicked.
function clearInputs() {
    $('#numberOne').val('');
    $('#numberTwo').val('');
    operation = '';

}
