//  Dependancies
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');

//  Register the environment variables
dotenv.config();

//  Connect to the database
require('./configuration/connection');
require('./models/user');

//  App
const app = express();

//  Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//  API Routes
app.use('/', require(path.join(__dirname, 'routes/index')));
app.use('/api/', require(path.join(__dirname, 'routes/users')));

//  Open the socket
app.listen(process.env.PORT || 3000, function() {
    console.log(chalk.green(`
        Starting the application. . .
        The application is listening on the port : ${process.env.PORT}

        Go to :
            ${chalk.red('http://localhost:' + process.env.PORT)}
    `));
});