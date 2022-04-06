module.exports = (req, res, next) => {
  try {
    if (!req.user.username) throw new Error('Unauthorized');
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
