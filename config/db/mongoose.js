const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(
    chalk.yellow.bold.underline(
      `MongoDB connected: ${connection.connection.host}`
    )
  );
};

module.exports = connectDB;
