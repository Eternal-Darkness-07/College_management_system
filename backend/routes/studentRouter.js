//student routes
import {Router} from 'express';

import {
    getstudentCourseCount,
    getStudentCourses,
    featchDepartments,
} from '../controllers/studedntController.js';

const router = Router();

router.get('/student/count/:id', getstudentCourseCount);
router.get('/student/course/:id', getStudentCourses);
router.get('/student/departments', featchDepartments);

export default router;