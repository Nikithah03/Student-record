import React, { useState, useEffect } from "react";
import axios from "axios";

function TeacherPage() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");

  // Fetch students and their teachers
  const fetchStudentTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/getAllStudentTeachers");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching student-teacher data:", error);
    }
  };

  useEffect(() => {
    fetchStudentTeachers();
  }, []);

  // Add a new teacher and refresh the table
  const addTeacher = async () => {
    try {
      const payload = { studentId, name, subject, marks };
      await axios.post("http://localhost:5000/api/teachers", payload);
      
      // Clear input fields
      setStudentId("");
      setName("");
      setSubject("");
      setMarks("");

      // Fetch updated student-teacher list
      fetchStudentTeachers();
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Add Teacher</h2>

      {/* Input Fields */}
      <input className="input-field" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
      <input className="input-field" placeholder="Teacher Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="input-field" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <input className="input-field" placeholder="Marks" value={marks} onChange={(e) => setMarks(e.target.value)} />
      <button className="add-button" onClick={addTeacher}>Add Teacher</button>

      {/* Student and Assigned Teachers Table */}
      <h3>Students and Their Teachers</h3>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Class</th>
            <th>Teacher Name</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) =>
            student.teachers.length > 0 ? (
              student.teachers.map((teacher, index) => (
                <tr key={`${student._id}-${teacher._id}`}>
                  {index === 0 && (
                    <>
                      <td rowSpan={student.teachers.length}>{student.studentId}</td>
                      <td rowSpan={student.teachers.length}>{student.name}</td>
                      <td rowSpan={student.teachers.length}>{student.className}</td>
                    </>
                  )}
                  <td>{teacher.name}</td>
                  <td>{teacher.subject}</td>
                </tr>
              ))
            ) : (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.className}</td>
                <td colSpan="2">No teachers assigned</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherPage;
