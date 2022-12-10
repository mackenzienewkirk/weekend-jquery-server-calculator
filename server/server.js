const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

let equation;
let result;
let history = [];

function calculator() {
    let firstNumber = Number(object.firstNumber);
    let secondNumber = Number(object.secondNumber);
//math logic for the calculator
    if (object.type === '+') {
        object.result = firstNumber + secondNumber;
        toString(object.result);
    }

    history.push(object);
    console.log(history);
    return object;
}


app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
})