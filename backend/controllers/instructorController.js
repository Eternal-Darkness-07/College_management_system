//instructor Controller
import connection from "../config/connection.js";

export const countCourse = async (req, res) => {
    try {
        const { id } = req.params
        const [rows] = await connection  .query("SELECT COUNT(*) as count FROM course WHERE instructor_id = ?", id);
        res.json(rows[0].count);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

export const getAllCoursesByInstructor = async (req, res) => {
    try {
        const { id } = req.params
        const [rows] = await connection  .query("SELECT * FROM course WHERE instructor_id =?", id);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

export const getAllStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await connection  .query(`
                        SELECT 
                s.student_id,
                s.name AS student_name,
                s.email AS student_email,
                c.course_id,
                c.course_name
            FROM 
                student s
            JOIN 
                enrollment e ON s.student_id = e.student_id
            JOIN 
                course c ON e.course_id = c.course_id
            WHERE 
                c.instructor_id = ?; 
            `, id);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

export const removestudents = (req, res) => { 
    try {
        const { student_id, course_id } = req.params;
        console.log(student_id, course_id);
        connection  .query("DELETE FROM enrollment WHERE course_id =? AND student_id =?", [course_id, student_id]);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

export const enrollStudent = async (req, res) => {
    try {
        const { student_id, course_id } = req.body;
        const [ExistStudent] = await connection  .query(`
            SELECT COUNT(*) AS count FROM enrollment WHERE student_id = ? AND course_id = ?
            `, [student_id, course_id]);
        if(ExistStudent[0].count > 0) {
            return res.status(400).json({ error: "Student already enrolled in this course." });
        }
        const [result] = await connection  .query(`
            INSERT INTO enrollment (student_id, course_id) VALUES (?,?);
            `, [student_id, course_id]);
        res.status(201).json({ message: "Student enrolled successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};