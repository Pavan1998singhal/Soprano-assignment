const router = require('express').Router();

const upload = require('../helperFunctions/upload');

const users = require('../controllers/user.controllers');

router.post('/signup', users.uploadFiles, users.registration);

router.post('/login', users.login);

module.exports = router;