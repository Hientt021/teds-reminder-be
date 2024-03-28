import mongoose from "mongoose";
const connectionString = "mongodb://127.0.0.1:27017";

export const connectDataBase = async () => {
  try {
    const conn = await mongoose.connect(connectionString, {
      dbName: "tedsReminder",
    });
    return conn;
  } catch (e) {
    console.error(e);
  }
};
