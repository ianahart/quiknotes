const path = require('path');

const express = require('express');
const helmet = require('helmet');
const chalk = require('chalk');
const methodOverride = require('method-override');

const connectDB = require('./config/db/mongoose');
const notesRoutes = require('./routes/notesRoutes');

require('dotenv').config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(helmet());

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
