import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import AddDefect from './AddDefect';
import CommentsList from './CommentsList';
import UserContext from '../UserContext';

function ProjectDefects() {
  const { projectId } = useParams();
  const { user } = useContext(UserContext); // получаем текущего пользователя
  const [defects, setDefects] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Загружаем дефекты проекта
  useEffect(() => {
    api.get('defects/')
      .then(response => {
        const filtered = response.data.filter(d => d.project === parseInt(projectId));
        setDefects(filtered);
      })
      .catch(error => console.error(error));
  }, [projectId]);

  // Добавление нового дефекта
  const handleDefectAdded = (newDefect) => {
    setDefects(prev => [...prev, newDefect]);
  };

  // Фильтрация и поиск
  const filteredDefects = defects
    .filter(d => (statusFilter ? d.status === statusFilter : true))
    .filter(d => (priorityFilter ? d.priority === priorityFilter : true))
    .filter(d => d.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Дефекты проекта</h1>

      {/* Форма добавления дефекта - только для инженеров и менеджеров */}
      {(user?.role === 'ENGINEER' || user?.role === 'MANAGER') && (
        <AddDefect projectId={projectId} onDefectAdded={handleDefectAdded} />
      )}

      {/* Фильтры и поиск */}
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Поиск по названию"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <select onChange={e => setStatusFilter(e.target.value)} style={{ marginRight: '10px' }}>
          <option value="">Все статусы</option>
          <option value="Новая">Новая</option>
          <option value="В работе">В работе</option>
          <option value="На проверке">На проверке</option>
          <option value="Закрыта">Закрыта</option>
          <option value="Отменена">Отменена</option>
        </select>
        <select onChange={e => setPriorityFilter(e.target.value)}>
          <option value="">Все приоритеты</option>
          <option value="Низкий">Низкий</option>
          <option value="Средний">Средний</option>
          <option value="Высокий">Высокий</option>
        </select>
      </div>

      {/* Список дефектов */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredDefects.map(defect => (
          <li key={defect.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
            <strong>{defect.title}</strong> | Статус: {defect.status} | Приоритет: {defect.priority}

            {/* Комментарии: добавлять могут только инженеры и менеджеры, наблюдатели видят только список */}
            <CommentsList
              defectId={defect.id}
              canAddComment={user?.role === 'ENGINEER' || user?.role === 'MANAGER'}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectDefects;
