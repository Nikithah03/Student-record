import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";
import MarksPage from "./pages/MarksPage";
import "./App.css"
function App() {
  return (   
    <Router>
      <nav className="nav-bar">
        <Link to="/students" className="nav-link">Students</Link>
        <Link to="/teachers" className="nav-link">Teachers</Link>
        <Link to="/marks" className="nav-link">Marks</Link>
      </nav>
      <Routes>
        <Route path="/students" element={<StudentPage />} />
        <Route path="/teachers" element={<TeacherPage />} />
        <Route path="/marks" element={<MarksPage />} />
      </Routes>
    </Router>
  );
}

export default App;