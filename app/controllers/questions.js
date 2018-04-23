/**
 * Module dependencies.
 */
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
 * @returns {object} - An instace of Question
 */
exports.show = (req, res) => {
  res.jsonp(req.question);
};

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} List of Questions
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
 *
 * @param {object} cb
 * @param {object} regionId
 * @returns {object} List of Question For Game
 */
exports.allQuestionsForGame = (cb, regionId) => {
  let query = {};
  if (regionId === '3' || !regionId) {
    query = {
      official: true,
      numAnswers: { $lt: 3 }
    };
  } else {
    query = {
      regionId,
      official: true,
      numAnswers: { $lt: 3 }
    };
  }
  Question.find(query).select('-_id').exec((err, questions) => {
    if (err) {
      throw err;
    }
    cb(questions);
  });
};
