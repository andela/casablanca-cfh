/**
 * Module dependencies.
 */
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { all as avatars } from './avatars';

const User = mongoose.model('User');


/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {any} redirect to avatars page
 */
exports.authCallback = (req, res, next) => {
  res.redirect('/chooseavatars');
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {any} redirect to signin page if there's an error
 * @returns {any} redirect to app page if there's no error
 */
exports.signin = (req, res) => {
  if (!req.user) {
    res.redirect('/#!/signin?error=invalid');
  } else {
    res.redirect('/#!/app');
  }
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {any} redirect to signup page if the user isn't logged in
 * @returns {any} redirect to app page if th
 */
exports.signup = (req, res) => {
  if (!req.user) {
    res.redirect('/#!/signup');
  } else {
    res.redirect('/#!/app');
  }
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {any} redirect to the index page
 */
exports.signout = (req, res) => {
  req.logout();
  res.redirect('/');
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {any} redirect to the index page
 */
exports.session = (req, res) => {
  res.redirect('/');
};

/**
 * Check avatar - Confirm if the user who logged in via passport
 * already has an avatar. If they don't have one, redirect them
 * to our Choose an Avatar page.
 * @param {object} req
 * @param {object} res
 * @returns {any} redirect to the index page if the user has an avatar
 * @returns {any} redirect to the chooseavatars page if the user doesn't have an avatar
 */
exports.checkAvatar = (req, res) => {
  if (req.user && req.user._id) {
    User.findOne({
      _id: req.user._id
    })
      .exec((err, user) => {
        if (user.avatar !== undefined) {
          res.redirect('/#!/');
        } else {
          res.redirect('/#!/choose-avatar');
        }
      });
  } else {
    // If user doesn't even exist, redirect to /
    res.redirect('/');
  }
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {any} redirect to the signup page with an error if the create method fails
 * @returns {any} redirect to the signup page with an error if the user already exists
 * @returns {any} redirect to the signup page with an error if any required field is empty
 */
exports.create = (req, res, next) => {
  if (req.body.name && req.body.password && req.body.email) {
    User.findOne({
      email: req.body.email
    }).exec((err, existingUser) => {
      if (!existingUser) {
        const user = new User(req.body);
        // Switch the user's avatar index to an actual avatar url
        user.avatar = avatars[user.avatar];
        user.provider = 'local';
        user.save((err) => {
          if (err) {
            return res.render('/#!/signup?error=unknown', {
              errors: err.errors,
              user
            });
          }
          req.logIn(user, (err) => {
            if (err) return next(err);
            return res.redirect('/#!/');
          });
        });
      } else {
        return res.redirect('/#!/signup?error=existinguser');
      }
    });
  } else {
    return res.redirect('/#!/signup?error=incomplete');
  }
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {any} response object containing the token if the signup process is successful
 * @returns {any} response object without the token if the signup process is successful
 */
exports.signupJWT = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: 'Internal server error'
        });
      }
      if (user) {
        res.status(409).send({
          success: false,
          message: 'User already exists'
        });
      } else {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          username: req.body.username
        })
          .then(() => {
            const payload = {
              name: req.body.name,
              email: req.body.email
            };
            const token = jwt.sign(payload, process.env.secret, { expiresIn: '1w' });
            res.status(201).send({
              success: true,
              message: 'User created successfully',
              token
            });
          })
          .catch(() => {
            res.status(400).send({
              success: false,
              message: 'Signup failed'
            });
          });
      }
    });
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {any} redirect to app page
 */
exports.avatars = (req, res) => {
  // Update the current user's profile to include the avatar choice they've made
  if (req.user && req.user._id && req.body.avatar !== undefined &&
    /\d/.test(req.body.avatar) && avatars[req.body.avatar]) {
    User.findOne({
      _id: req.user._id
    })
      .exec((err, user) => {
        user.avatar = avatars[req.body.avatar];
        user.save();
      });
  }
  return res.redirect('/#!/app');
};

exports.addDonation = (req, res) => {
  /* eslint no-underscore-dangle: 0 */
  if (req.body && req.user && req.user._id) {
    // Verify that the object contains crowdrise data
    if (req.body.amount && req.body.crowdrise_donation_id && req.body.donor_name) {
      User.findOne({
        _id: req.user._id
      })
        .exec((err, user) => {
          // Confirm that this object hasn't already been entered
          let duplicate = false;
          for (let i = 0; i < user.donations.length; i += 1) {
            if (user.donations[i].crowdrise_donation_id === req.body.crowdrise_donation_id) {
              duplicate = true;
            }
          }
          if (!duplicate) {
            // console.log('Validated donation');
            user.donations.push(req.body);
            user.premium = 1;
            user.save();
          }
        });
    }
  }
  res.send();
};

/**
 *  @param {object} req
 *  @param {object} res
 *  @returns {any} render the user's show page with their details
 */
exports.show = (req, res) => {
  const user = req.profile;

  res.render('users/show', {
    title: user.name,
    user
  });
};

/**
 *  @param {object} req
 *  @param {object} res
 *  @returns {any} return object
 */
exports.me = (req, res) => {
  res.jsonp(req.user || null);
};

/**
 *  @param {object} req
 *  @param {object} res
 *  @param {object} next
 *  @param {number} id
 *  @returns {any} render the user's show page with their details
 */
exports.user = (req, res, next, id) => {
  User
    .findOne({
      _id: id
    })
    .exec((err, user) => {
      if (err) return next(err);
      if (!user) return next(new Error(`Failed to load User ${id}`));
      req.profile = user;
      next();
    });
};
