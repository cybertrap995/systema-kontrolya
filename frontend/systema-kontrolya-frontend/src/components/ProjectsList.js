import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function ProjectsList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects/')
      .then(response => setProjects(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Проекты</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsList;
