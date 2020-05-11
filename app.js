const path = require('path');

const chalk = require('chalk');
const helmet = require('helmet');
const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const connectDB = require('./config/db/mongoose');
const notesRoutes = require('./routes/notesRoutes');

require('dotenv').config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(helmet());

app.use(session({
  secret: process.env.SESSION,
  resave: true,
  saveUninitialized: true,
}));

app.use(flash());

// Global variables for flash
app.use((req, res, next) => {
  res.locals.success_message = req.flash('success_message');
  res.locals.error_message = req.flash('error_message');
  res.locals.error = req.flash('error');
  next()
});

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use('/', notesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(
    chalk.blue.bold.underline(`Server listening at 127.0.0.1:${PORT}`)
  )
);
