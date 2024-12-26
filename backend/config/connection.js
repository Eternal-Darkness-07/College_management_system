// connection.js
import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config(); // Load environment variables from .env file

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const createTables = async () => {
  const tables = {
    instructor: `
      CREATE TABLE IF NOT EXISTS instructor (
        instructor_id varchar(7) NOT NULL,
        name varchar(100) NOT NULL,
        email varchar(100) NOT NULL,
        password varchar(255) NOT NULL,
        department_name varchar(10) NOT NULL,
        PRIMARY KEY (instructor_id),
        UNIQUE KEY email (email)
      )`,
    
    department: `
      CREATE TABLE IF NOT EXISTS department (
        department_name varchar(100) NOT NULL,
        head_id varchar(7) DEFAULT NULL,
        PRIMARY KEY (department_name),
        FOREIGN KEY (head_id) REFERENCES instructor (instructor_id)
      )`,

    course: `
      CREATE TABLE IF NOT EXISTS course (
        course_id varchar(10) NOT NULL,
        course_name varchar(100) NOT NULL,
        instructor_id varchar(7) DEFAULT NULL,
        PRIMARY KEY (course_id),
        FOREIGN KEY (instructor_id) REFERENCES instructor (instructor_id) ON DELETE CASCADE
      )`,

    student: `
      CREATE TABLE IF NOT EXISTS student (
        student_id varchar(15) NOT NULL,
        name varchar(100) NOT NULL,
        password varchar(255) NOT NULL,
        email varchar(100) NOT NULL,
        PRIMARY KEY (student_id),
        UNIQUE KEY email (email)
      )`,
    
    enrollment: `
      CREATE TABLE IF NOT EXISTS enrollment (
        enrollment_id int NOT NULL AUTO_INCREMENT,
        student_id varchar(15) NOT NULL,
        course_id varchar(10) NOT NULL,
        PRIMARY KEY (enrollment_id),
        FOREIGN KEY (student_id) REFERENCES student (student_id),
        FOREIGN KEY (course_id) REFERENCES course (course_id)
      )`
  };

  const defaultOptions = 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci';

  try {
    for (const [tableName, query] of Object.entries(tables)) {
      await connection.promise().query(query + defaultOptions);
      console.log(`Table ${tableName} created successfully`);
    }
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error; // Propagate error to connection handler
  }
};

connection.connect(async (err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to the database.");
  await createTables();
});

export default connection;
