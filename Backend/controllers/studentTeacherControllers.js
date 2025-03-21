const StudentTeacher = require("../models/StudentTeacher");

// Add or Update Student
const createOrUpdateStudent = async (req, res) => {
  try {
    const { studentId, name, className } = req.body;

    let student = await StudentTeacher.findOne({ studentId });

    if (student) {
      student.name = name;
      student.className = className;
      
    } else {
      student = new StudentTeacher({ studentId, name, className, teachers: [] });
    }

    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: "Failed to create/update student", error: err.message });
  }
};

// Add Teacher to a Student
const addTeacher = async (req, res) => {
  try {
    const { studentId, name, subject, marks } = req.body;

    let student = await StudentTeacher.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.teachers.push({ name, subject, marks });

    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: "Failed to add teacher", error: err.message });
  }
};

// Fetch all Student-Teacher Data
const getAllStudentTeachers = async (req, res) => {
  try {
    const students = await StudentTeacher.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students", error: err.message });
  }
};

// Get Student-Teacher Data by Student ID
const getStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await StudentTeacher.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch student", error: err.message });
  }
};

module.exports = { createOrUpdateStudent, addTeacher, getAllStudentTeachers, getStudentById };
