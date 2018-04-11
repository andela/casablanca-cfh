/**
 * Generic require login routing middleware
 */
// exports.requiresLogin = function (req, res, next) {
//   if (!req.isAuthenticated()) {
//     return res.send(401, 'User is not authorized');
//   }
//   next();
// };

/**
 * User authorizations routing middleware
 */
// exports.user = {
//   hasAuthorization(req, res, next) {
//         if (req.profile.id != req.user.id) {
//             return res.send(401, 'User is not authorized');
//         }
//         next();
//     }
// };

/**
 * Article authorizations routing middleware
 */
// exports.article = {
//     hasAuthorization: function(req, res, next) {
//         if (req.article.user.id != req.user.id) {
//             return res.send(401, 'User is not authorized');
//         }
//         next();
//     }
// };


import jwt from 'jsonwebtoken';

/**
 * Class Definition for the Authorization Object
 *
 * @export
 * @class Authorization
 */
export default class Authorization {
/**
 * @description Middleware to verify the supplied token
 *
 * @static
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 * @returns {Object} response containing user's access status
 *
 * @memberof Authorization
 */
  static requiresLogin(req, res, next) {
    const token = req.headers.authorization || req.body.token || req.headers.token;
    if (!(token)) {
      return res.status(401).json({
        message: 'Missing token. Expects token in header or body'
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.message === 'jwt expired') {
          res.status(401).json({
            message: 'Access token has expired. You are required to login again'
          });
        } else {
          res.status(401).json({
            message: 'Authentication failed. Invalid access token'
          });
        }
      }
      req.payload = decoded.payload;
      next();
    });
  }

  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns {object} authorization response and status
   * @memberof Authorization
   */
  static hasAuthorization(req, res, next) {
    if (req.profile.id !== req.user.id) {
      return res.status(401).send('User is not authorized');
    }
    next();
  }
}

