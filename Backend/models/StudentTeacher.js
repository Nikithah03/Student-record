const mongoose = require("mongoose");

const StudentTeacherSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  className: { type: String, required: true },
  marks: { type: Number, required: false },
  teachers: [
    {
      name: { type: String, required: true },
      subject: { type: String, required: true },
      marks: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model("StudentTeacher", StudentTeacherSchema);
