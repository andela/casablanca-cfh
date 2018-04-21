/**
 * Module dependencies.
 */
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import { all as avatars } from './avatars';


const User = mongoose.model('User');
const Notification = mongoose.model('Notification');
/**
 * An helper to genrate token that expires in one week.
 * @param {Object} payload The payload to embed in the token.
 * @returns {String} The token generated.
 */
const generateToken = payload => jwt.sign(payload, process.env.secret, { expiresIn: '1w' });

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

// returns all users
exports.search = (req, res) => {
  User.find({}, (error, users) => {
    if (error) {
      return res.status(500).json({
        message: 'Server error.'
      });
    }

    return res.json(users);
  });
};

const sendInviteMail = (email, req, res) => {
  const recieverEmail = email;
  nodemailer.createTestAccount((err, account) => {/* eslint-disable-line */
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD
      }
    });

    // setup email data with unicode symbols
    const mailOptions = {
      from: 'noreply@casablanca-cfh.com', // sender address
      to: recieverEmail, // receiver
      subject: 'CFH Game Invite', // Subject line
      text: `Hi there, 
      A friend has requested that you join a game of 
      Cards For Humanity. To do so, please click on the link below
      or if that does not work, copy and paste it in your browser.
       ${req.body.urlLink}
       
       Signed,
       Casasblanca-CFH`, // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (res) {
        if (error) {
          return res.json(error);
        }
        return res.json({ sent: true, info });
      }
    });
  });
};

const sendInviteNotification = (recieverEmail, req, res) => {
  const details = {
    url: req.body.urlLink,
    receiver: recieverEmail,
    sender: req.decoded.email,
    message: `You have 
      been invited to join a game by ${req.decoded.name}, 
      click this message to join ${req.body.urlLink}`
  };
  Notification.create(details)
    .then((notification) => {
      res.status(201).send({
        success: true,
        message: notification.message,
        notification
      });
    })
    .catch((error) => {
      res.status(400).send({
        success: false,
        message: 'Error occurred while sending notification(s)',
        error: error.message
      });
    });
};

exports.invitePlayers = (req, res) => {
  const recieverEmail = req.body.email;
  User.findOne({
    email: recieverEmail
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error'
      });
    }
    if (!user) {
      // invite by email
      sendInviteMail(recieverEmail, req, res);
    } else {
      // invite by notification and email
      sendInviteMail(recieverEmail, req);
      sendInviteNotification(recieverEmail, req, res);
    }
  });
};

exports.getGameInviteNotification = (req, res) => {
  Notification.find({
    receiver: req.decoded.email,
    read: false
  })
    .then((notifications) => {
      res.status(200).send({
        success: true,
        notifications
      });
    });
};

exports.readGameInviteNotification = (req, res) => {
  Notification.update({
    receiver: req.decoded.email,
  }, { read: true, read_at: Date.now() }, { multi: true })
    .then((response) => {
      res.status(200).send({
        success: true,
        message: 'You have successfully read your notification',
        response
      });
    })
    .catch((error) => {
      res.status(400).send({
        success: false,
        message: 'Error occurred while fetching your notification',
        error: error.message
      });
    });
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
            res.status(201).send({
              success: true,
              message: 'User created successfully',
              token: generateToken({ name: req.body.name, email: req.body.email }),
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
 * Handles user-login logic and send a resonse with token if successful.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Object} The response object with some response data.
 */
exports.loginJWT = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .exec((err, user) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: 'Internal server error'
        });
      } else if (!user) {
        res.status(404).send({
          success: false,
          message: 'User not found',
        });
      } else {
        if (bcrypt.compareSync(password, user.hashed_password)) {
          return res.status(200).send({
            success: true,
            message: 'Login successful',
            token: generateToken({ name: user.name, email }),
          });
        }
        return res.status(401).send({
          success: false,
          message: 'Incorrect password',
        });
      }
    });
};


exports.addFriend = (req, res) => {
  const friendEmail = req.body.email;
  const { email } = req.decoded;
  User.findOne({ email: friendEmail })
    .exec((err, userFound) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: 'Internal server error'
        });
      } else if (!userFound) {
        return res.status(404).send({
          success: false,
          message: 'User might not exist anymore',
        });
      }
      User.update(
        { email },
        { $push: { friendList: friendEmail } },
        { new: true }, (err, response) => res.status(200).send({
          message: 'User added to list',
          user: response
        })
      );
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
          for (let i = 0; i < user.donations.length; i = 1) {
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

