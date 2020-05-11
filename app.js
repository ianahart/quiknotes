const path = require('path');

const chalk = require('chalk');
const helmet = require('helmet');
const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const connectDB = require('./config/db/mongoose');

const notesRoutes = require('./routes/notesRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();

require('dotenv').config({ path: './config/config.env' });

connectDB();

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION,
    resave: true,
    saveUninitialized: true,
  })
);

require('./config/passport-setup')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables for flash
app.use((req, res, next) => {
  res.locals.success_message = req.flash('success_message');
  res.locals.error_message = req.flash('error_message');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next()
});

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));



app.use('/', notesRoutes);
app.use('/users', userRoutes);






const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(
    chalk.blue.bold.underline(`Server listening at 127.0.0.1:${PORT}`)
  )
);
