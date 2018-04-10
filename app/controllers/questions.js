/**
 * Module dependencies.
 */
// let mongoose = require('mongoose'),
//   async = require('async'),
//   Question = mongoose.model('Question'),
//   _ = require('underscore');
import mongoose from 'mongoose';

const Question = mongoose.model('Question');


/**
 * Find question by id
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @param {object} id
 * @returns {object} question object
 */
exports.question = (req, res, next, id) => {
  Question.load(id, (err, question) => {
    if (err) return next(err);
    if (!question) return next(new Error(`Failed to load question ${id}`));
    req.question = question;
    next();
  });
};

/**
 * Show a question
 * @param {object} req
 * @param {object} res
 */
exports.show = (req, res) => {
  res.jsonp(req.question);
};

/**
 * List of Questions
 */
exports.all = (req, res) => {
  Question.find({
    official: true,
    numAnswers: { $lt: 3 }
  }).select('-_id').exec((err, questions) => {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(questions);
    }
  });
};

/**
 * List of Questions (for Game class)
 */
exports.allQuestionsForGame = (cb) => {
  Question.find({}, ((err, questions) => {
    if (err) {
      throw err;
    } else {
      cb(questions);
    }
  }));
};
