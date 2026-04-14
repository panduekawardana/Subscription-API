import mongoose from 'mongoose';
import {NODE_ENV} from "../config/env.js";

if(!DB_URI) {
  throw new Error('Please check your DB URI .env.<development/production>.local');
}

const connectionDatabase = async () => {
   try {
      await mongoose.connect(DB_URI);
      console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
   } catch (error) {
      console.error('Error connecting to MongoDB', error);
      process.exit(1);
   }
}

export default connectionDatabase;