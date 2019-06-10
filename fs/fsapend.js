var fs = require('fs');

fs.appendFile('mynewfile1.txt', 'Hello content!\n', function (err) {
    if (err) throw err;
    console.log('Updated!');
});