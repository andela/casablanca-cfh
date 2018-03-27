import dotenv from 'dotenv';
import _ from 'underscore';


process.env.NODE_ENV = process.env.NODE_ENV || 'development';
dotenv.config();

// Load app configuration

module.exports = _.extend(
    require(__dirname + '/../config/env/all.js'),
    require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.json') || {});