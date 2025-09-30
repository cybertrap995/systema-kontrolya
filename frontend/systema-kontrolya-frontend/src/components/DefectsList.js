import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DefectsList() {
  const [defects, setDefects] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/defects/')
      .then(response => setDefects(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Список дефектов</h1>
      <ul>
        {defects.map(defect => (
          <li key={defect.id}>
            <strong>{defect.title}</strong> | Статус: {defect.status} | Приоритет: {defect.priority}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DefectsList;
