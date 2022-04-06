const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Secret = require('../models/Secret');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const secrets = await Secret.getAll();
      res.send(secrets);
    } catch (err) {
      next(err);
    }
  })

  .post('/', authenticate, async (req, res, next) => {
    try {
      const secret = await Secret.create(req.body);
      res.send(secret);
    } catch (error) {
      next(error);
    }
  });
