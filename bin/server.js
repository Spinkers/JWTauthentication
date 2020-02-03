const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('../src/modules/auth');

const signin = require('../src/modules/signin');
const signup = require('../src/modules/signup');
const dashboard = require('../src/modules/dashboard');

const app = express();
const port = 3000;
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(auth.initialize);
auth.configStrategies();

const server = http.createServer(app);
const router = express.Router();

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Node API',
        version: '0.0.1',
    });
});

app.use('/', route);
app.use('/signin', signin.API);
app.use('/signup', signup.API);
app.use('/dashboard', dashboard.API);

server.listen(port);

console.log('API is running on port ', port);
