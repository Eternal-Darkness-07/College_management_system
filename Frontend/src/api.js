//api.js
import axios from "axios";

const API_URL = "http://localhost:3000";

export const countInstructors = () => axios.get(`${API_URL}/admin/countInstructors`).then(res => res.data);
export const countCourses = () => axios.get(`${API_URL}/admin/countCourses`).then(res => res.data);
export const countStudents = () => axios.get(`${API_URL}/admin/countStudents`).then(res => res.data);

export const featchInstructors = () => axios.get(`${API_URL}/admin/InstructorList`).then(res => res.data);
export const deleteInstructor = (id) => axios.delete(`${API_URL}/admin/deleteInstructor/${id}`).then(res => res.data);
export const addInstructor = (formData) => axios.post(`${API_URL}/admin/addInstructor`, formData).then(res => res.data);
export const updateInstructor = (id, formData) => axios.put(`${API_URL}/admin/updateInstructor/${id}`, formData);
export const getInstructorbyid = (id) => axios.get(`${API_URL}/admin/getInstructorbyid/${id}`).then(res => res.data);

export const featchCourses = () => axios.get(`${API_URL}/admin/CourseList`).then(res => res.data);
export const deleteCourse = (id) => axios.delete(`${API_URL}/admin/deleteCourse/${id}`).then(res => res.data);
export const addCourse = (formData) => axios.post(`${API_URL}/admin/addCourse`, formData).then(res => res.data);
export const updateCourse = (id, formData) => axios.put(`${API_URL}/admin/updateCourse/${id}`, formData);
export const getCoursebyid = (id) => axios.get(`${API_URL}/admin/getCoursebyid/${id}`).then(res => res.data);

export const featchStudents = () => axios.get(`${API_URL}/admin/StudentList`).then(res => res.data);
export const deleteStudent = (id) => axios.delete(`${API_URL}/admin/deleteStudent/${id}`).then(res => res.data);
export const addStudent = (formData) => axios.post(`${API_URL}/admin/addStudent`, formData).then(res => res.data);
export const updateStudent = (id, formData) => axios.put(`${API_URL}/admin/updateStudent/${id}`, formData);
export const getStudentbyid = (id) => axios.get(`${API_URL}/admin/getStudentbyid/${id}`).then(res => res.data);

export const featchDepartment = () => axios.get(`${API_URL}/admin/DepartmentList`).then(res => res.data);
export const deleteDepartment = (id) => axios.delete(`${API_URL}/admin/deleteDepartment/${id}`).then(res => res.data);
export const addDepartment = (formData) => axios.post(`${API_URL}/admin/addDepartment`, formData).then(res => res.data);
export const updateDepartment = (id, formData) => axios.put(`${API_URL}/admin/updateDepartment/${id}`, formData);
export const getDepartmentbyid = (id) => axios.get(`${API_URL}/admin/getDepartmentbyid/${id}`).then(res => res.data);

export const countInstructorCourses = (id) => axios.get(`${API_URL}/instructor/count/${id}`).then(res => res.data); 
export const getCoursesByInstructor = (id) => axios.get(`${API_URL}/instructor/course/${id}`).then(res => res.data);
export const getStudentsByInstructor = (id) => axios.get(`${API_URL}/instructor/students/${id}`).then(res => res.data);
export const removeStudentFromCourse = (id_stu, id_co) => axios.delete(`${API_URL}/instructor/removestudent/${id_stu}/${id_co}`).then(res => res.data);
export const enrollStudent = (data) => axios.post(`${API_URL}/instructor/enrollment`, data).then(res => res.data);


export const countStudentCourses = (id) => axios.get(`${API_URL}/student/count/${id}`).then(res => res.data);
export const getStudentCourses = (id) => axios.get(`${API_URL}/student/course/${id}`).then(res => res.data);
export const fetchDepartments = () => axios.get(`${API_URL}/student/departments`).then(res => res.data);