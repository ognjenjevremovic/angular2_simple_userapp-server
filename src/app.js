//  Dependancies
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//  App
const app = express();

//  Register the environment variables
dotenv.config();


//  Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//  Connect to the database instance
const db_connection = `http://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose.connect(db_connection);



//  Open the socket
app.listen(process.env.PORT || 3000, function() {
    console.log(`
        Starting the application. . .
        The application is listening on the port : ${process.env.PORT}

        Go to :
            http://localhost:${process.env.PORT}
    `);
});