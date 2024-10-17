//instructor router
import {Router} from 'express';

import {
 countCourse,
 getAllCoursesByInstructor,
 getAllStudent,   
 removestudents,
 enrollStudent,
} from '../controllers/instructorController.js';


const router = Router();

router.get('/instructor/count/:id', countCourse);
router.get('/instructor/course/:id', getAllCoursesByInstructor);
router.get('/instructor/students/:id', getAllStudent);
router.delete('/instructor/removestudent/:student_id/:course_id', removestudents);
router.post('/instructor/enrollment', enrollStudent);

export default router;