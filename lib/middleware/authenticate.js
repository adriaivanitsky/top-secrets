const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];
    // Check the httpOnly session cookie for the current user
    // Verify the JWT token stored in the cookie, then attach to each request
    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = user;
    // console.log(user);
    next();
  } catch (err) {
    err.message = 'you must be signed in to continue';
    err.status = 401;
    next(err);
  }
};
