const express = require('express');

const router = express.Router();

const studentController = require('../controllers/StudentControllers');

const teacherController = require('../controllers/TeacherControllers');

const marksController = require('../controllers/MarksControllers');
 
const studentTeacherControllers = require('../controllers/studentTeacherControllers')

// router.get('/students', studentController.getAllStudents);

router.get('/students/:id', studentController.getStudentById);

router.post('/students', studentTeacherControllers.createOrUpdateStudent);

router.put('/students/:id', studentController.updateStudent);

router.delete('/students/:id', studentController.deleteStudent);
 
 
// router.get('/teachers', teacherController.getAllTeachers);

router.post('/teachers', studentTeacherControllers.addTeacher);

router.delete('/teachers/:id', teacherController.deleteTeacher);

router.put('/teachers/:id', teacherController.updateTeacher);
 
router.get('/marks/:studentId', marksController.getMarksForStudent);

router.get('/getAllStudentTeachers', studentTeacherControllers.getAllStudentTeachers);

router.put("/students/:studentId", studentTeacherControllers.updateStudent); // Edit student

router.delete("/students/:studentId", studentTeacherControllers.deleteStudent);
 
module.exports = router;
 