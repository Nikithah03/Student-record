const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  className: {
    type: String,
    required: true, // Class name is required
  },
  age: {
    type: Number,
    required: true, // Age is required
    min: [1, "Age must be greater than 0"], // Optional validation
  },
});


// Define the models
const Student = mongoose.model("Student", StudentSchema);


module.exports = Student; 