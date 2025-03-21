const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensuring 'name' is required
  },
  subject: {
    type: String,
    required: true, // Ensuring 'subject' is required
  },
});

// Create the Teacher model based on the schema
const Teacher = mongoose.model("Teacher", TeacherSchema);

// Export the Teacher model
module.exports = Teacher;