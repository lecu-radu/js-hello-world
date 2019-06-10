const http = require('http');
const url = require('url');
var querystring = require('querystring');

http.createServer(function (req, res) {
    processRequest(req, res);
}).listen(8080);

function processRequest(req, res) {
    let queryData = "";

    if (req.method === 'POST') {
        processPost(req, queryData, () => createResponse(req, res));
    } else {
        createResponse(req, res);
    }
}

function processPost(req, queryData, callback) {
    req.on('data', function (data) {
        queryData += data;
        if (queryData.length > 1e6) {
            queryData = "";
        }
    });

    req.on('end', function () {
        console.log(queryData);
        req.body = queryData;
        callback();
    });
}

function createResponse(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    let parse = url.parse(req.url, true);
    let query = parse.query;
    console.log(parse);
    res.write('path' + ': ' + parse.path + '\n');
    res.write('href' + ': ' + parse.href + '\n');
    res.write('pathname' + ': ' + parse.pathname + '\n');
    if (req.body != null) {
        console.log(req.body);
        res.write('body' + ': ' + req.body + '\n');
    }
    let prop;
    for (prop in query) {
        res.write(prop + ': ' + query[prop] + '\n');
    }
    res.end();
}

