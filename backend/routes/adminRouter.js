//adminRoute.js
import {Router} from 'express';
import {
    countCourses,
    countInstructors,
    countStudents,

    featchInstructors,
    getInstructorById,
    updateInstructor,
    addInstructor,
    deleteInstructor,

    featchCourses,
    deleteCourse,
    addCourse,
    updateCourse,
    getCourseById,

    featchStudents,
    deleteStudent,
    addStudent,
    updateStudent,
    getStudentById,

    featchDepartments,
    deleteDepartment,
    addDepartment,
    getDepartmentById,
    updateDepartment,

} from '../controllers/adminController.js';

const router = Router();

router.get('/admin/countInstructors', countInstructors);
router.get('/admin/countCourses', countCourses);
router.get('/admin/countStudents', countStudents);

router.get('/admin/InstructorList', featchInstructors);
router.delete('/admin/deleteInstructor/:id', deleteInstructor);
router.post('/admin/addInstructor', addInstructor);
router.put('/admin/updateInstructor/:id', updateInstructor);
router.get('/admin/getInstructorbyid/:id', getInstructorById);

router.get('/admin/CourseList', featchCourses);
router.delete('/admin/deleteCourse/:id', deleteCourse);
router.post('/admin/addCourse', addCourse);
router.put('/admin/updateCourse/:id', updateCourse);
router.get('/admin/getCoursebyid/:id', getCourseById);

router.get('/admin/StudentList', featchStudents);
router.delete('/admin/deleteStudent/:id', deleteStudent);
router.post('/admin/addStudent', addStudent);
router.put('/admin/updateStudent/:id', updateStudent);
router.get('/admin/getStudentbyid/:id', getStudentById);

router.get('/admin/DepartmentList', featchDepartments);
router.delete('/admin/deleteDepartment/:id', deleteDepartment);
router.post('/admin/addDepartment', addDepartment);
router.put('/admin/updateDepartment/:id', updateDepartment);
router.get('/admin/getDepartmentbyid/:id', getDepartmentById);

export default router;


