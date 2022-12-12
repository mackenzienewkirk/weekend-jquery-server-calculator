const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let equation;
let result;
let history = [];
//Variables to use throughout the server sides functions.


app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({ extended: true }));

//Variables to use throughout the server sides functions.


app.post('/submit', (req, res) => {
    equation = req.body;
    calculator(equation);
    //a response to signal the client side recieved the calculation.
    res.sendStatus(201);
});

//a function to calculate the given information.
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

//sending the calculated numbers in the history array back to client.js.
app.get('/submit', (req, res) => {
    console.log('GET /submit sent to the client side');
    res.send(history);
})

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})
