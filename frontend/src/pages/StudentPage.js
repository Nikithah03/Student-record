import React, { useState, useEffect } from "react";
import "./StudentPages.css";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    studentId: "",
    name: "",
    className: "",
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [editedData, setEditedData] = useState({
    studentId: "",
    name: "",
    className: "",
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  console.log(BASE_URL)
  useEffect(() => {
    fetchStudents();
  }, []);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getAllStudentTeachers`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Handle input change for new student
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // Handle input change for editing student
  const handleEditChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  // Add a new student
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${BASE_URL}/Students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
      alert("Student added successfully!");
      setStudent({ studentId: "", name: "", className: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // Set student to edit mode
  const handleEdit = (student) => {
    setEditingStudent(student._id);
    setEditedData({
      studentId: student.studentId,
      name: student.name,
      className: student.className,
    });
  };

  // Update student details
  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:5000/api/students/${editingStudent}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedData),
      });
      setEditingStudent(null);
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  // Delete a student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await fetch(`http://localhost:5000/api/students/${id}`, { method: "DELETE" });
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Cancel edit mode
  const handleCancel = () => {
    setEditingStudent(null);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Student Management</h2>

      {/* Student Form for Adding */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <h3>Add Student</h3>
        <input type="text" name="studentId" value={student.studentId} onChange={handleChange} placeholder="Student ID" required />
        <input type="text" name="name" value={student.name} onChange={handleChange} placeholder="Student Name" required />
        <input type="text" name="className" value={student.className} onChange={handleChange} placeholder="Class Name" required />
        <button type="submit">Add Student</button>
      </form>

      {/* Student Table */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              {editingStudent === student._id ? (
                <>
                  <td><input type="text" name="studentId" value={editedData.studentId} onChange={handleEditChange} /></td>
                  <td><input type="text" name="name" value={editedData.name} onChange={handleEditChange} /></td>
                  <td><input type="text" name="className" value={editedData.className} onChange={handleEditChange} /></td>
                  <td>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{student.studentId}</td>
                  <td>{student.name}</td>
                  <td>{student.className}</td>
                  <td>
                    <button onClick={() => handleEdit(student.studentId)}>Edit</button>
                    <button onClick={() => handleDelete(student.studentId)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManagement;
