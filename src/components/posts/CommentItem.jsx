import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

const CommentItem = ({ postId, comment, auth }) => {
  const handleDelete = async () => {
    try {
      await api.delete(`/api/posts/comments/${postId}/${comment._id}`);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <div>
        <div>
          <img src={comment.avatar} alt="avatar" width="40" />
          <Link to={`/profile/${comment.user}`}>
            <h4>{comment.name}</h4>
          </Link>
          {auth.user._id === comment.user && (
            <button onClick={handleDelete}>X</button>
          )}
        </div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentItem;
