const Teacher = require('../models/Teacher');
 
// Get all teachers

const getAllTeachers = async (req, res) => {

  try {

    const teachers = await Teacher.find();

    res.json(teachers);

  } catch (err) {

    res.status(500).json({ message: "Failed to fetch teachers", error: err });

  }

};
 
// Create a new teacher

// **Add Teacher to Student**
const createTeacher = async (req, res) => {
    try {
      const { studentId, teacherName, subject, marks } = req.body;
  
      if (!studentId || !teacherName || !subject || marks === undefined) {
        return res.status(400).json({ message: "Student ID, Teacher Name, Subject, and Marks are required" });
      }
  
      let student = await StudentTeacher.findOne({ studentId });
  
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      student.teachers.push({ name: teacherName, subject, marks });
  
      await student.save();
      res.status(201).json(student);
    } catch (err) {
      res.status(500).json({ message: "Failed to add teacher", error: err.message });
    }
  };

 
const updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (updatedTeacher) {
      res.json(updatedTeacher);
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update teacher", error: err });
  }
};
// Delete a teacher

const deleteTeacher = async (req, res) => {

  try {

    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

    if (deletedTeacher) {

      res.json({ message: "Teacher deleted" });

    } else {

      res.status(404).json({ message: "Teacher not found" });

    }

  } catch (err) {

    res.status(500).json({ message: "Failed to delete teacher", error: err });

  }

};
 
module.exports = {

  getAllTeachers,

  createTeacher,

  deleteTeacher,

  updateTeacher,

};
 