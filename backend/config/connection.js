import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config(); // Load environment variables from .env file

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const createTables = async () => {
  const tables = [
    `CREATE TABLE IF NOT EXISTS instructor (
      instructor_id varchar(7) NOT NULL,
      name varchar(100) NOT NULL,
      email varchar(100) NOT NULL,
      password varchar(255) NOT NULL,
      department_name varchar(10) NOT NULL,
      PRIMARY KEY (instructor_id),
      UNIQUE KEY email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    
    `CREATE TABLE IF NOT EXISTS department (
      department_name varchar(100) NOT NULL,
      head_id varchar(7) DEFAULT NULL,
      PRIMARY KEY (department_name),
      KEY department_ibfk_1 (head_id),
      CONSTRAINT department_ibfk_1 FOREIGN KEY (head_id) REFERENCES instructor (instructor_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,

    `CREATE TABLE IF NOT EXISTS course (
      course_id varchar(10) NOT NULL,
      course_name varchar(100) NOT NULL,
      instructor_id varchar(7) DEFAULT NULL,
      PRIMARY KEY (course_id),
      KEY course_ibfk_1 (instructor_id),
      CONSTRAINT course_ibfk_1 FOREIGN KEY (instructor_id) REFERENCES instructor (instructor_id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,

    `CREATE TABLE IF NOT EXISTS student (
      student_id varchar(15) NOT NULL,
      name varchar(100) NOT NULL,
      password varchar(255) NOT NULL,
      email varchar(100) NOT NULL,
      PRIMARY KEY (student_id),
      UNIQUE KEY email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,

    `CREATE TABLE IF NOT EXISTS enrollment (
      enrollment_id int NOT NULL AUTO_INCREMENT,
      student_id varchar(15) NOT NULL,
      course_id varchar(10) NOT NULL,
      PRIMARY KEY (enrollment_id),
      KEY student_id (student_id),
      KEY course_id (course_id),
      CONSTRAINT enrollment_ibfk_1 FOREIGN KEY (student_id) REFERENCES student (student_id),
      CONSTRAINT enrollment_ibfk_2 FOREIGN KEY (course_id) REFERENCES course (course_id)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
  ];

  for (const query of tables) {
    try {
      await pool.query(query);
      console.log("Table created successfully or already exists.");
    } catch (error) {
      console.error("Error creating table:", error.message);
    }
  }
};

await createTables();

export default pool;
