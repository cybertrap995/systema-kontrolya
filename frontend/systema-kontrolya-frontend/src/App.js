import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProjectsList from './components/ProjectsList';
import ProjectDefects from './components/ProjectDefects';

function App() {
  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <nav>
          <Link to="/" style={{ marginRight: "15px" }}>Проекты</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProjectsList />} />
          <Route path="/projects/:projectId" element={<ProjectDefects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
