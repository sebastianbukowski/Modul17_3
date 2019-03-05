var express = require('express');
var fs = require('fs'); // moduł wbudowany w node js udostępniający metody potrzebne do pracy z plikami w node js np, readFile czy writeFile
var bodyParser = require('body-parser');

var app = express();
var stringifyFile = '';

app.use(bodyParser.json());

// odczytanie pliku test.json i odesłanie jego zawartości do przegladarki
 
app.get('/getNote', function(req, res) {
    fs.readFile('./test.json', 'utf8', function(err, data) {
        if (err) throw err;
        stringifyFile = data
        console.log(stringifyFile)
        res.send(data);
    });
});


app.post('/updateNote/:note', function(req, res) {
    console.log(req.params.note)
    console.log(stringifyFile)
    var parsedFile = JSON.parse(stringifyFile);
    parsedFile.note = req.params.note;
    console.log(parsedFile)
    stringifyFile = JSON.stringify(parsedFile);
    console.log(stringifyFile)
    fs.writeFile('./test.json', stringifyFile, function(err) {
        if (err) throw err;
        console.log('file updated');
    });
    res.send('Identyfikator, który został dopisany to ' +  req.params.note);
});

app.listen(3000);

// app.get('/', function(req, res) {
//     console.log('Otrzymałem żądanie GET do strony głównej');
//     res.send('Hello GET!');
// });

// app.post('/', function(req, res) {
//     console.log('Otrzymałem żądanie POST do strony głównej');
//     res.send('Hello POST!');
// });

// app.delete('/del_user', function(req, res) {
//     console.log('Otrzymałem żądanie DELETE do strony del_user');
//     res.send('Hello DELETE!');
// });

// app.get('/list_user', function(req, res) {
//     console.log('Otrzymałem żądanie GET do strony /list_user');
//     res.send('Strona z listą użytkowników');
// });

// app.get('/ab*cd', function(req, res) {
//     console.log('Otrzymałem żądanie GET do strony /ac*cd');
//     res.send('Wzór pasuje');
// });

// // app.get('/:id', function (req, res) {
// //     res.send('Identyfikator, który został dopisany to ' +  req.params.id);
// // });

// app.get('/', function (req, res) {
//     res.send('Hello world');
// });

// app.use(function (req, res, next) {
//     res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
// });



// var server = app.listen(3000, function() {
//     console.log('Przykładowa aplikacja nasłuchuje na  http://localhost:3000');
// })


