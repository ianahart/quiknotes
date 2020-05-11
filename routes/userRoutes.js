const express = require('express');

const {
  login,
  register,
  registerForm,
  loginForm,
  logout,
} = require('../controllers/authControllers');

const router = express.Router();

router.route('/login').get(login).post(loginForm);
router.route('/register').get(register).post(registerForm);
router.route('/logout').get(logout);
module.exports = router;
