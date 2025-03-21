const Student = require("../models/Student");

// Get all students

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students", error: err });
  }
};

// Get a student by ID

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch student", error: err });
  }
};

// Create a new student
const createStudent = async (req, res) => {
    try {
      const { studentId, name, className, marks } = req.body;
  
      if (!studentId || !name || !className || marks === undefined) {
        return res.status(400).json({ message: "Student ID, Name, Class, and Marks are required" });
      }
  
      let student = await StudentTeacher.findOne({ studentId });
  
      if (student) {
        student.name = name;
        student.className = className;
        student.marks = marks;
      } else {
        student = new StudentTeacher({ studentId, name, className, marks, teachers: [] });
      }
  
      await student.save();
      res.status(201).json(student);
    } catch (err) {
      res.status(500).json({ message: "Failed to create/update student", error: err.message });
    }
  };
  

// Update a student's details

const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (updatedStudent) {
      res.json(updatedStudent);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update student", error: err });
  }
};

// Delete a student

const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (deletedStudent) {
      res.json({ message: "Student deleted" });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete student", error: err });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
