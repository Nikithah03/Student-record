import React, { useState, useEffect } from "react";
import axios from "axios";


function MarksSheetPage() {
  const [students, setStudents] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/getAllStudentTeachers`);
        setStudents(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchStudentData();
  }, []);

  
  return (
    <div className="marks-container">
      <h2 className="marks-title">Marks Sheet</h2>
      <h5>NOTE: If teacher assigned to student then only student details will be displayed here</h5>
      <table className="marks-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Class</th>
            <th>Teacher Name</th>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) =>
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
                <td>{teacher.marks}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MarksSheetPage;
