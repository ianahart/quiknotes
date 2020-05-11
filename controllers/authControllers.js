const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../model/User');

exports.login = (req, res, next) => {
  res.render('login', {
    pageTitle: 'Login',
  });
};

exports.logout = (req, res, next) => {
  req.logout();
  req.flash('success_message', 'You are now logged out');
  res.redirect('/users/login');
};

exports.register = (req, res, next) => {
  res.render('register', {
    pageTitle: 'Register',
    errors: '',
  });
};

exports.loginForm = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
};

exports.registerForm = async (req, res, next) => {
  let errors = [];
  try {
    const { name, email, password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
      errors.push({ text: 'Passwords do not match' });
    }

    if (password.length < 6) {
      errors.push({ text: 'Password must be more than 6 characters' });
    }
    if (errors.length > 0) {
      res.render('register', {
        errors,
        pageTitle: 'Register',
      });
    } else {
      const user = await User.findOne({ email });
      if (user) {
        req.flash('error_message', 'That email is already registered');
        res.redirect('/users/register');
      } else {
        const user = new User({
          name,
          email,
          password,
        });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        await user.save();
        res.redirect('/users/login');
      }
    }
  } catch (err) {
    return console.log(err);
  }
};
