/**
 * Module dependencies.
 */
import express from 'express';
import passport from 'passport';
import logger from 'mean-logger';
import io from 'socket.io';
import mongoose from 'mongoose';
import config from './config/config';
import auth from './config/middlewares/authorization';
import './app/models/user';
import './app/models/question';
import './app/models/answer';
import passportConfig from './config/passport';
import expressSettings from './config/express';
import routes from './config/routes';
import socket from './config/socket/socket';

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// if test env, load example file


// const config = require('./config/config');

mongoose.Promise = global.Promise;
// Bootstrap db connection
mongoose.connect(config.db, {
  useMongoClient: true
});

// bootstrap passport config
passportConfig(passport);

const app = express();

app.use((req, res, next) => {
  next();
});

// express settings
expressSettings(app, passport, mongoose);

// Bootstrap routes
routes(app, passport, auth);

// Start the app by listening on <port>
const { port } = config;
const server = app.listen(port);
const ioObj = io.listen(server, { log: false });
// game logic handled here
socket(ioObj);

// eslint-disable-next-line no-console
console.log(`Express app started on port ${port}`);

// Initializing logger
logger.init(app, passport, mongoose);

// expose app
export default app;
