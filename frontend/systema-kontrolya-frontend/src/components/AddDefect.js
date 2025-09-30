import React, { useState, useEffect } from 'react';
import api from '../api';

function AddDefect({ projectId, onDefectAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Средний');
  const [status, setStatus] = useState('Новая');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects/').then(res => setProjects(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('defects/', {
      title,
      description,
      priority,
      status,
      project: parseInt(projectId),
    })
      .then(res => {
        onDefectAdded(res.data);
        setTitle('');
        setDescription('');
        setPriority('Средний');
        setStatus('Новая');
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Добавить новый дефект</h3>
      <input
        type="text"
        placeholder="Название дефекта"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <textarea
        placeholder="Описание"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <select value={priority} onChange={e => setPriority(e.target.value)} style={{ marginRight: '10px' }}>
        <option value="Низкий">Низкий</option>
        <option value="Средний">Средний</option>
        <option value="Высокий">Высокий</option>
      </select>
      <select value={status} onChange={e => setStatus(e.target.value)} style={{ marginRight: '10px' }}>
        <option value="Новая">Новая</option>
        <option value="В работе">В работе</option>
        <option value="На проверке">На проверке</option>
        <option value="Закрыта">Закрыта</option>
        <option value="Отменена">Отменена</option>
      </select>
      <button type="submit">Добавить</button>
    </form>
  );
}

export default AddDefect;
