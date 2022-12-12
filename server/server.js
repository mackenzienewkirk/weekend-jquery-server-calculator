const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({ extended: true }));


let calculations = []
//Variables to use throughout the server sides functions.

app.get('/calculations', (req, res) => {
    console.log('get /calculations!');
    res.send(calculations);
})

app.post('/calculations', (req, res) => {
    console.log('post /calculations!');

    let numOne = Number(req.body.numOne);
    let numTwo = Number(req.body.numTwo);
    let operator = req.body.operator;

    let result;
    if (operator === '+') {
        result = numOne + numTwo;
    } else if (operator === '-') {
        result = numOne - numTwo;
    } else if (operator === '/') {
        result = numOne / numTwo;
    } else if (operator === '*') {
      result = numOne * numTwo;
    }

    let finalCalculation = {
        numOne: numOne,
        numTwo: numTwo,
        operator: operator,
        result: result
    }

    calculations.push(finalCalculation)

    res.sendStatus(201);
})


app.listen(PORT, () => {
    console.log(`Server is running on port, http://localhost:${PORT}!`);
})
