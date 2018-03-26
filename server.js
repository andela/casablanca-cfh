/**
 * Module dependencies.
 */
import express from 'express';
import fs from 'fs';
import path from 'path';
import passport from 'passport';
import logger from 'mean-logger';
import io from 'socket.io';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// if test env, load example file
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('./config/config');
const auth = require('./config/middlewares/authorization');

mongoose.Promise = global.Promise;
// Bootstrap db connection
mongoose.connect(config.db, {
  useMongoClient: true
});

// Bootstrap models
const modelsPath = path.join(__dirname, '/app/models');
const walk = (filePath) => {
  fs.readdirSync(filePath).forEach((file) => {
    const newPath = `${filePath}/${file}`;
    const stat = fs.statSync(newPath);
    if (stat.isFile()) {
      if (/(.*)\.(js|coffee)/.test(file)) {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        require(newPath);
      }
    } else if (stat.isDirectory()) {
      walk(newPath);
    }
  });
};
walk(modelsPath);

// bootstrap passport config
require('./config/passport')(passport);

const app = express();

app.use((req, res, next) => {
  next();
});

// express settings
require('./config/express')(app, passport, mongoose);

// Bootstrap routes
require('./config/routes')(app, passport, auth);

// Start the app by listening on <port>
const { port } = config;
const server = app.listen(port);
const ioObj = io.listen(server, { log: false });
// game logic handled here
require('./config/socket/socket')(ioObj);

// eslint-disable-next-line no-console
console.log(`Express app started on port ${port}`);

// Initializing logger
logger.init(app, passport, mongoose);

// expose app
export default app;
