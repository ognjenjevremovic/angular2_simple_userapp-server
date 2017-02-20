//  Dependancies
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

//  Register the environment variables
dotenv.config();


//  App
const app = express();

//  routes
const indexRoute = require(path.join(__dirname, 'routes/index'));
const usersRoute = require(path.join(__dirname, 'routes/users'));


//  Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//  Application routes
app.use('/', indexRoute);
app.use('/api/', usersRoute);


//  Open the socket
app.listen(process.env.PORT || 3000, function() {
    console.log(`
        Starting the application. . .
        The application is listening on the port : ${process.env.PORT}

        Go to :
            http://localhost:${process.env.PORT}
    `);
});