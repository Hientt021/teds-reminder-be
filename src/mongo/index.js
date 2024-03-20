const mongoose = require("mongoose");

const connectionString = "mongodb://127.0.0.1:27017";

const connectDataBase = async () => {
  try {
    const conn = await mongoose.connect(connectionString, {
      dbName: "tedsReminder",
    });
    return conn;
  } catch (e) {
    console.error(e);
  }
};

module.exports.connectDataBase = connectDataBase;
