const mongoose = require("mongoose");

// Define the Marks Schema
const MarksSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Reference to the Student model
    required: true, // Ensure that studentId is required
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher', // Reference to the Teacher model
    required: true, // Ensure that teacherId is required
  },
  subject: {
    type: String,
    required: true, // Ensure that subject is required
  },
  marks: {
    type: Number,
    required: true, // Marks are required
    min: [0, 'Marks cannot be less than 0'], // Optional validation (marks should be >= 0)
    max: [100, 'Marks cannot be greater than 100'], // Optional validation (marks should be <= 100)
  },
});

// Create the Marks model from the schema
const Marks = mongoose.model("Marks", MarksSchema);

// Export the Marks model
module.exports = Marks;
