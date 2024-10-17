// connection.js
import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config(); // Load environment variables from .env file

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// connection.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err.stack);
//     return;
//   }
//   console.log("Connected to the database.");
// });

export default connection;
