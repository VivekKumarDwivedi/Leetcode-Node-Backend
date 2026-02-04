//this file contain all the basic configuration logic to server work
import dotenv from 'dotenv';

type ServerConfig={
PORT : number,
DB_URL : string
};
 function loadEnv() {
  dotenv.config();
  console.log('Environment variables loaded successfully');
}
loadEnv();

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3000,
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/lc_problem_db"
};
