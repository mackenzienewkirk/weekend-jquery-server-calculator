const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({ extended: true }));

//Variables to use throughout the server sides functions.
let equation;
let result;
let history = [];

app.post('/submit', (req, res) => {
    equation = req.body;
    calculator(equation);
    //a response to signal the client side recieved the calculation.
    res.sendStatus(201);
});

app.get('/submit', (req, res) => {
    res.send(history);
})


function calculator(object) {
    let firstNumber = Number(object.firstNumber);
    let secondNumber = Number(object.secondNumber);
//math logic for the calculator.
    if (object.type === '+') {
        object.result = firstNumber + secondNumber;
        toString(object.result);
    }
    if (object.type === '-') {
        object.result = firstNumber - secondNumber;
        toString(object.result);
    }
    if (object.type === 'x') {
        object.result = firstNumber * secondNumber;
        toString(object.result);

    }
    if (object.type === '/') {
        object.result = firstNumber / secondNumber;
        toString(object.result);

    history.push(object);
    console.log(history);
    
    }return object;
}

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
})
