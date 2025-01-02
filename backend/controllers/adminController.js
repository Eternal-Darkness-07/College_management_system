//adminController.js
import connection from "../config/connection.js";

export const countCourses = async (req, res) => {
  try {
    const [rows] = await connection
      .query("SELECT COUNT(*) AS count FROM course");
    res.json(rows[0].count);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const countInstructors = async (req, res) => {
  try {
    const [rows] = await connection
.query("SELECT COUNT(*) AS count FROM instructor");
    res.json(rows[0].count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const countStudents = async (req, res) => {
  try {
    const [rows] = await connection
      .query("SELECT COUNT(*) AS count FROM student");
    res.json(rows[0].count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const featchInstructors = async (req, res) => {
  try {
    const [rows] = await connection
      .query(
        "SELECT instructor_id, name, email, department_name FROM instructor"
      );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Instructor ID:", id); // Log to check

    // First, update department head_id to "Yet to be appointed" where the head_id matches the instructor id
    const [rows] = await connection
      .query("UPDATE department SET head_id = NULL WHERE head_id = ?", [id]);
    // Then, delete the instructor where instructor_id matches the provided id
    const [result] = await connection
      .query("DELETE FROM instructor WHERE instructor_id = ?", [id]);

    res.status(200).json({ message: "Instructor deleted successfully." });
  } catch (error) {
    console.error("Error deleting instructor:", error.message, error.stack); // Log the error stack
    res.status(500).json({ error: error.message });
  }
};

export const addInstructor = async (req, res) => {
  try {
    const { instructor_id, name, email, password, department_name } = req.body;

    // Check if the instructor_id already exists
    const [instructorExists] = await connection
      .query(
        "SELECT COUNT(*) AS count FROM instructor WHERE instructor_id = ?",
        [instructor_id]
      );

    if (instructorExists[0].count > 0) {
      return res.status(400).json({ error: "Instructor ID already exists." });
    }

    // Add the new instructor to the instructor table
    await connection
      .query(
        "INSERT INTO instructor (instructor_id, name, email, password, department_name) VALUES (?,?,?,?,?)",
        [instructor_id, name, email, password, department_name]
      );

    res.status(201).json({ message: "Instructor added successfully." });
  } catch (error) {
    console.error("Error adding instructor:", error.message, error.stack); // Log the error stack
    res.status(500).json({ error: "Server error" });
  }
};

export const updateInstructor = async (req, res) => {
  try {
    const { id } = req.params; // Get the instructor id from the request parameters
    const { instructor_id, name, email, department_name } = req.body;
    await connection.query(
      `UPDATE instructor 
        SET 
        instructor_id =?,
        name =?,
        email =?,
        department_name =?
        WHERE instructor_id =?`,
      [instructor_id, name, email, department_name, id] // Update the instructor details where the instructor_id matches the provided id
    );
    res.status(201).json({ message: "Instructor updated successfully." });
  } catch (error) {
    console.error("Error updating instructor:", error.message, error.stack); // Log the error stack
    res.status(500).json({ error: "Server error" });
  }
};

export const getInstructorById = async (req, res) => {
  try {
    const { id } = req.params; // Get the instructor id from the request parameters
    const [rows] = await connection
      .query(
        "SELECT instructor_id, name, email, department_name FROM instructor WHERE instructor_id =?",
        [id]
      ); // Fetch the instructor details where the instructor_id matches the provided id
    if (rows.length === 0) {
      return res.status(404).json({ error: "Instructor not found." });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching instructor:", error.message, error.stack); // Log the error stack
    res.status(500).json({ error: "Server error" });
  }
};

export const featchCourses = async (req, res) => {
  try {
    const [rows] = await connection.query(
      `SELECT 
          course.course_id, 
          course.course_name, 
          course.instructor_id, 
          instructor.name AS instructor_name
        FROM 
          course
        INNER JOIN 
          instructor 
        ON 
          course.instructor_id = instructor.instructor_id;`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    // Then, delete the instructor where instructor_id matches the provided id
    await connection
      .query(`DELETE FROM enrollment WHERE course_id = ?`, [id]);
    const [result] = await connection
      .query("DELETE FROM course WHERE course_id = ?", [id]);

    res.status(200).json({ message: "Instructor deleted successfully." });
  } catch (error) {
    console.error("Error deleting instructor:", error.message, error.stack); // Log the error stack
    res.status(500).json({ error: error.message });
  }
};

export const addCourse = async (req, res) => {
  try {
    const { course_id, course_name, instructor_id } = req.body;

    // Check if the instructor_id already exists
    const [CourseExists] = await connection
      .query("SELECT COUNT(*) AS count FROM course WHERE course_id = ?", [
        course_id,
      ]);

    if (CourseExists[0].count > 0) {
      return res.status(400).json({ error: "Course ID already exists." });
    }

    // Add the new instructor to the instructor table
    await connection
      .query(
        `INSERT INTO course ( course_id, course_name, instructor_id) VALUES (?,?,?)`,
        [course_id, course_name, instructor_id]
      );

    res.status(201).json({ message: "Course added successfully." });
  } catch (error) {
    console.error("Error adding Course:", error.message, error.stack); // Log the error stack
    res.status(500).json({ error: "Server error" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params; // Get the course id from the request parameters
    const { course_id, course_name, instructor_id } = req.body;
    await connection.query(
      `UPDATE course 
        SET 
        course_id =?,
        course_name =?,
        instructor_id =?
        WHERE course_id =?`,
      [course_id, course_name, instructor_id, id] // Update the course details where the course_id matches the provided id
    );
    res.status(201).json({ message: "Course updated successfully." });
  } catch (error) {
    console.error("Error updating course:", error.message, error.stack); // Log the error stack
    res.status(500).json({ error: "Server error" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params; // Get the course id from the request parameters
    const [rows] = await connection
      .query(
        "SELECT course_id, course_name, instructor_id FROM course WHERE course_id =?",
        [id]
      ); // Fetch the course details where the course_id matches the provided id
    if (rows.length === 0) {
      return res.status(404).json({ error: "Course not found." });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching course:", error.message, error.stack); // Log the error stack
    res.status(500).json({ error: "Server error" });
  }
};

export const featchStudents = async (req, res) => {
  try {
    const [rows] = await connection
       
      .query(`SELECT student_id, name, email FROM student;`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    // Then, delete the instructor where instructor_id matches the provided id
    await connection
       
      .query(`DELETE FROM enrollment WHERE student_id = ?`, [id]);
    const [result] = await connection
       
      .query("DELETE FROM student WHERE student_id = ?", [id]);

    res.status(200).json({ message: "Student deleted successfully." });
  } catch (error) {
    console.error("Error deleting instructor:", error.message, error.stack); // Log the error stack
    res.status(500).json({ error: error.message });
  }
};

export const addStudent = async (req, res) => {
  try {
    const { student_id, name, password, email } = req.body;

    // Check if the instructor_id already exists
    const [StudentExists] = await connection
       
      .query("SELECT COUNT(*) AS count FROM student WHERE student_id = ?", [
        student_id,
      ]);

    if (StudentExists[0].count > 0) {
      return res.status(400).json({ error: "Student ID already exists." });
    }

    // Add the new instructor to the instructor table
    await connection
       
      .query(
        `INSERT INTO student ( student_id, name, password, email) VALUES (?,?,?,?)`,
        [student_id, name, password, email]
      );

    res.status(201).json({ message: "Student added successfully." });
  } catch (error) {
    console.error("Error adding Course:", error.message, error.stack); // Log the error stack
    res.status(500).json({ error: "Server error" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params; // Get the course id from the request parameters
    const { student_id, name, email } = req.body;
    await connection .query(
      `UPDATE student 
        SET 
         student_id =?,
         name = ?,
         email =?
        WHERE student_id =?`,
      [student_id, name, email, id] // Update the course details where the course_id matches the provided id
    );
    res.status(201).json({ message: "Student updated successfully." });
  } catch (error) {
    console.error("Error updating student:", error.message, error.stack); // Log the error stack
    res.status(500).json({ error: "Server error" });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params; // Get the course id from the request parameters
    const [rows] = await connection
       
      .query("SELECT student_id,name, email FROM student WHERE student_id =?", [
        id,
      ]); // Fetch the course details where the course_id matches the provided id
    if (rows.length === 0) {
      return res.status(404).json({ error: "Student not found." });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching course:", error.message, error.stack); // Log the error stack
    res.status(500).json({ error: "Server error" });
  }
};

export const featchDepartments = async (req, res) => {
  try {
    const [rows] = await connection .query(
      `SELECT 
                department.department_name,  
                department.head_id, 
                instructor.name AS head_name
            FROM 
                department 
            LEFT JOIN 
                instructor 
            ON 
                department.head_id = instructor.instructor_id;
            `
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    // Then, delete the instructor where instructor_id matches the provided id
    const [result] = await connection
       
      .query("DELETE FROM department WHERE department_name = ?", [id]);

    res.status(200).json({ message: "Department deleted successfully." });
  } catch (error) {
    console.error("Error deleting :", error.message, error.stack); // Log the error stack
    res.status(500).json({ error: error.message });
  }
};

export const addDepartment = async (req, res) => {
  try {
    const { department_name, head_id } = req.body;

    // Check if the instructor_id already exists
    const [DepartmentExists] = await connection
       
      .query(
        "SELECT COUNT(*) AS count FROM department WHERE department_name = ?",
        [department_name]
      );

    if (DepartmentExists[0].count > 0) {
      return res.status(400).json({ error: "Department already exists." });
    }

    // Add the new instructor to the instructor table
    await connection
       
      .query(
        `INSERT INTO department ( department_name, head_id) VALUES (?,?)`,
        [department_name, head_id]
      );

    res.status(201).json({ message: "Department added successfully." });
  } catch (error) {
    console.error("Error adding Department:", error.message, error.stack); // Log the error stack
    res.status(500).json({ error: "Server error" });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params; // Get the course id from the request parameters
    const { department_name, head_id } = req.body;
    await connection .query(
      `UPDATE department
        SET 
         department_name =?,
         head_id = ?
        WHERE department_name =?`,
      [department_name, head_id, id] // Update the course details where the course_id matches the provided id
    );
    res.status(201).json({ message: "Deparment updated successfully." });
  } catch (error) {
    console.error("Error updating student:", error.message, error.stack); // Log the error stack
    res.status(500).json({ error: "Server error" });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params; // Get the course id from the request parameters
    console.log(id);
    const [rows] = await connection
      .query("SELECT * FROM department WHERE department_name =?", [id]); // Fetch the course details where the course_id matches the provided id
    if (rows.length === 0) {
      return res.status(404).json({ error: "Department not found." });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching course:", error.message, error.stack); // Log the error stack
    res.status(500).json({ error: "Server error" });
  }
};
