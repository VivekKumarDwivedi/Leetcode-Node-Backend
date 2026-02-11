//this file contain all the basic configuration logic to server work
import dotenv from 'dotenv';
import mongoose from 'mongoose';

type ServerConfig={
PORT : number,
DB_URL : string
};
 function loadEnv() {
  dotenv.config();
  console.log('Environment variables loaded successfully');
}
loadEnv();
async function connectDB() { 
  try { await mongoose.connect(process.env.DB_URL as string); 
    console.log("MongoDB connected"); 
  } catch (err) { 
    console.error("MongoDB connection error:", err);
     process.exit(1); 
    } 
  } 
connectDB();
export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3000,
  DB_URL: process.env.DB_URL || "mongodb://127.0.0.1:27017/lc_problem_db"
};
