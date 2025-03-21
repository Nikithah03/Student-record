const Marks = require('../models/Marks');
 
// Get marks for a specific student

const getMarksForStudent = async (req, res) => {

  try {

    const marksData = await Marks.findOne({ studentId: req.params.studentId }).populate('studentId');

    if (marksData) {

      res.json(marksData);

    } else {

      res.status(404).json({ message: "Marks not found for the student" });

    }

  } catch (err) {

    res.status(500).json({ message: "Failed to fetch marks", error: err });

  }

};
 
module.exports = {

  getMarksForStudent,

};
 