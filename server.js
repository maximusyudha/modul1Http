//========================================================================

// const http = require('http')

// const server = http.createServer((req, res) => {
//     // console.log(req);
//     const { headers, url, method } = req;
//     console.log('header', headers);
//     console.log('url',url);
//     console.log('method', method);

//     res.end('Hallo, gua max')
// });


// const PORT = 5000;

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//==========================================================================
//If DATA TRUE = 
// const http = require('http');

// const todos = [
//     { id: 1, text: 'Todo one'},
//     { id: 2, text: 'Todo Two'},
//     { id: 3, text: 'Todo Three'},
// ];

// const server = http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.setHeader('X-Powered-By', 'Node.js');

//     const data = JSON.stringify({
//         success: true,
//         data: todos,
//     });
//     res.end(data);
// });

// const PORT = 5000;

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//===========================================================================

//IF data Null
//===========================================================================
// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.setHeader('X-Powered-By', 'Node.js');

//     const data = JSON.stringify({
//         success: true,
//         error: 'Not Found',
//         data: null,
//     });
//     res.end(data);
// });

// const PORT = 5000;

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//===========================================================================

//Send Data 
//===========================================================================

// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.setHeader('X-Powered-By', 'Node.js');

//     let body = [];

//     req
//       .on('data', chunk => {
//         body.push(chunk);
//       })
//       .on('end', () => {
//         body = Buffer.concat(body).toString();
//         console.log(body);
//       });

//     const data = JSON.stringify({
//         success: true,
//         error: 'Not Found',
//         data: null,
//     });
//     res.end(data);
// });

// const PORT = 5000;

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//===========================================================================

// method GET dan POST
//===========================================================================
const http = require('http');
const { buffer } = require('stream/consumers');

const todos = [
    {id: 1, text: 'Todo One'},
    {id: 2, text: 'Todo Two'},
    {id: 3, text: 'Todo Three'},
];

const server = http.createServer((req, res) => {
    const {method, url} = req;
    let body = [];

    req.on('data', chunk => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.cocat(body).toString();

        let status = 404;
        const response = {
            success: false,
            results: [],
            error: ''
        };

        if (method === 'GET' && url === '/todos') {
            status = 200;
            response.success = true;
            response.results = todos;

        } else if (method === 'POST' && ulr === '/todos') {

            const { id, text } = JSON.parse(body);

            if (!id || !text) {
                status = 400;
                response.error = 'Please add id and text';
            } else {
                todos.push({id, text});
                status = 201;
                response.success = true;
                response.results = todos;
            }
        }
        
        res.writeHead(status, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'Node.js'
        });

        res.end(JSON.stringify(response));
    });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
