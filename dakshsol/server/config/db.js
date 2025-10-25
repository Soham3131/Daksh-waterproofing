// server/config/db.js
import mongoose from 'mongoose';
// Assuming the use of dotenv to load environment variables
// from the .env file in the project root.

/**
 * @function connectDB
 * @description Connects to the MongoDB database using Mongoose.
 */
const connectDB = async () => {
  try {
    // The MONGODB_URI should be defined in your .env file
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
