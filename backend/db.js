const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1/pivot_assignment', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
