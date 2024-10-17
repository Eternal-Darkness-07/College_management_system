import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Layout from './Components/Layout';

import AdminDashboard from './Components/admin_com/AdminDashboard';

import ManageInstructor from './Components/admin_com/ManageInstructor';
import AddInstructore from './Components/admin_com/AddInstructore';
import EditInstructor from './Components/admin_com/EditInstructor';

import ManageCourse from './Components/admin_com/ManageCourse';
import AddCourse from './Components/admin_com/AddCourse';
import EditCourse from './Components/admin_com/EditCourse';

import ManageStudent from './Components/admin_com/ManageStudent';
import AddStudent from './Components/admin_com/AddStudent';
import EditStudent from './Components/admin_com/EditStudent';

import ManageDepartment from './Components/admin_com/ManageDepartment';
import AddDepartment from './Components/admin_com/AddDepartment';
import EditDepartment from './Components/admin_com/EditDepartment';

import InstructerDashboard from './Components/instructor_com/InstructerDashboard';
import InstructorCourses from './Components/instructor_com/InstructorCourses';
import InstructorEnroll from './Components/instructor_com/InstructorEnroll';
import EnrollStudent from './Components/instructor_com/EnrollStudent';

import StudentDashboard from './Components/student_com/StudentDashboard';
import StudentMyCourses from './Components/student_com/StudentMyCourses';
import StudentSeeDepartments from './Components/student_com/StudentSeeDepartments';

const App = () => {
  const [navbarOptions, setNavbarOptions] = useState(() => {
    const storedOptions = localStorage.getItem('navbarOptions');
    return storedOptions ? JSON.parse(storedOptions) : [];
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedStatus = localStorage.getItem('isLoggedIn');
    return storedStatus === 'true';
  });

  const handleLogin = (id) => {
    let options = []; // Initialize options here

    if (id === 'admin') {
      options = [
        { label: 'Home', path: '/admin' },
        { label: 'Instructors', path: '/admin/manage-instructor' },
        { label: 'Students', path: '/admin/manage-student' },
        { label: 'Courses', path: '/admin/manage-courses' },
        { label: 'Departments', path: '/admin/manage-departments' },
      ];
    } else if (id.startsWith('FC')) {
      options = [
        { label: 'Home', path: `/instructor/${id}` },
        { label: 'Courses', path: `/instructor/courses/${id}`},
        { label: 'Enroll-Student', path: `/instructor/enroll-student/${id}` },
      ];
    } else if (id.startsWith('BT')) {
      options = [
        { label: 'Home', path: `/student/${id}` },
        { label: 'See My Courses', path: `/student/Courses/${id}` },
        { label: 'See Deparments', path: '/student/Departments' }
      ];
    } else {
      alert('Invalid ID');
      return; // Exit early on invalid ID
    }

    setNavbarOptions(options);
    setIsLoggedIn(true);
    localStorage.setItem('navbarOptions', JSON.stringify(options));
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setNavbarOptions([]);
    localStorage.removeItem('navbarOptions');
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
        <Route element={<Layout options={navbarOptions} isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/manage-instructor" element={<ManageInstructor />} />
          <Route path="/admin/add-instructor" element={<AddInstructore />} />
          <Route path="/admin/edit-instructor/:id" element={<EditInstructor />} />
          <Route path="/admin/manage-courses" element={<ManageCourse />} />
          <Route path="/admin/add-course" element={<AddCourse />} />
          <Route path="/admin/edit-course/:id" element={<EditCourse />} />
          <Route path="/admin/manage-student" element={<ManageStudent />} />
          <Route path="/admin/add-student" element={<AddStudent />} />
          <Route path="/admin/edit-student/:id" element={<EditStudent />} />
          <Route path="/admin/manage-departments" element={<ManageDepartment />} />
          <Route path="/admin/add-department" element={<AddDepartment />} />
          <Route path="/admin/edit-department/:name" element={<EditDepartment />} />
          
          <Route path="/instructor/:id" element={<InstructerDashboard />} />
          <Route path="/instructor/courses/:id" element={<InstructorCourses />} />
          <Route path="/instructor/enroll-student/:id" element={<InstructorEnroll />} />
          <Route path="/instructor/addstudent/:id" element={<EnrollStudent />} />

          
          <Route path="/student/:id" element={<StudentDashboard />} />
          <Route path="/student/Courses/:id" element={<StudentMyCourses />} />
          <Route path="/student/Departments" element={<StudentSeeDepartments />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
