import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import UserContext from '../UserContext';

function CommentsList({ defectId, canAddComment }) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    api.get('comments/')
      .then(res => {
        const filtered = res.data.filter(c => c.defect === defectId);
        setComments(filtered);
      })
      .catch(err => console.error(err));
  }, [defectId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    api.post('comments/', { text: newComment, defect: defectId })
      .then(res => {
        setComments(prev => [...prev, res.data]);
        setNewComment('');
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ marginTop: '10px', marginBottom: '20px' }}>
      <h4>Комментарии</h4>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>

      {/* Форма добавления комментария только если canAddComment = true */}
      {canAddComment && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Новый комментарий"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            style={{ width: '70%', marginRight: '10px' }}
          />
          <button type="submit">Добавить</button>
        </form>
      )}
    </div>
  );
}

export default CommentsList;
