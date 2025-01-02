//studentControlller
import connection from "../config/connection.js";

export const getstudentCourseCount = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await connection  .query(`SELECT COUNT(*) as count FROM enrollment WHERE student_id =?`, id);
        res.json(rows[0].count);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

export const getStudentCourses = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await connection  .query(`
            SELECT c.course_name as course_name, e.course_id as course_id
            FROM enrollment e
            JOIN course c ON e.course_id = c.course_id
            WHERE e.student_id = ?`, id);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

export const featchDepartments = async (req, res, next) => {
    try {
        const [rows] = await connection  .query(`
            select d.department_name, i.name as head_name
            from department d
            join instructor i
            on d.head_id = i.instructor_id;`);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};