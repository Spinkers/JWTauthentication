const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const admin = require('../src/modules/admin');

const app = express();
const port = 3000;
app.set('port', port);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const server = http.createServer(app);
const router = express.Router();

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Node API',
        version: '0.0.1',
    });
});

app.use('/', route);
app.use('/admin', admin.API);

server.listen(port);

console.log('API is running on port ', port);
