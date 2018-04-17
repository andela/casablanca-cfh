/**
 * Module dependencies.
 */
import mongoose from 'mongoose';
// import async from 'async';
// import _ from 'underscore';

const Answer = mongoose.model('Answer');


/**
 * Find answer by id
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @param {number} id
 * @returns {void}
 */
exports.answer = (req, res, next, id) => {
  Answer.load(id, (err, answer) => {
    if (err) return next(err);
    if (!answer) return next(new Error(`Failed to load answer ${id}`));
    req.answer = answer;
    next();
  });
};

/**
 * Show an answer
 * @param {object} req
 * @param {object} res
 * @returns {object} - An instace of Answer
 */
exports.show = (req, res) => {
  res.jsonp(req.answer);
};

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} - All Answers
 */
exports.all = (req, res) => {
  Answer.find({ official: true }).select('-_id').exec((err, answers) => {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(answers);
    }
  });
};

/**
 * List of Answers (for Game class)
 * @param {function} cb
 * @param {function} regionId
 * @returns {function} - callback function
 */
exports.allAnswersForGame = (cb, regionId) => {
  Answer.find({ official: true, regionId }).select('-_id').exec((err, answers) => {
    if (err) {
      throw (err);
    } else {
      cb(answers);
    }
  });
};
