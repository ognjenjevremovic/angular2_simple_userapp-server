const mongoose = require('mongoose');
const chalk = require('chalk');

const env = process.env;
const connectionUrl = `mongodb://${env.DB_USER}:${env.DB_PASS}@${env.DB_CONNECTION}/${env.DB_NAME}`;

mongoose.connect(connectionUrl);
mongoose.connection.on('connected', () => console.log(chalk.cyan(`
    Connection to the ${chalk.bold(env.DB_NAME)} database, established.
`)));
mongoose.connection.on('error', () => console.log(chalk.red(`
    Error connecting to the ${chalk.bold(env.DB_NAME)} database!
`)));