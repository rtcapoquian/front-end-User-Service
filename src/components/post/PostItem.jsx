import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

const PostItem = ({ post, onPostUpdated }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [error, setError] = useState(null);

  const handleLike = async () => {
    try {
      await api.put(`/api/posts/like/${post._id}`);
      setLikes(likes + 1); // Update the local state
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error liking post:', error);
      setError('Failed to like post.');
    }
  };

  const handleUnlike = async () => {
    try {
      await api.put(`/api/posts/unlike/${post._id}`);
      setLikes(likes - 1); // Update the local state
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error unliking post:', error);
      setError('Failed to unlike post.');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/posts/${post._id}`);
      if (onPostUpdated) {
        onPostUpdated(post._id); // Notify parent component about deletion
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post.');
    }
  };

  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div>
      <div>
        <h4>{post.name}: {post.text}</h4>
        <div>
          <button onClick={handleLike}>Like {likes}</button>
          <button onClick={handleUnlike}>Unlike</button>
          <Link to={`/posts/${post._id}`}>Comments {post.comments.length}</Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
        {error && <div className="error">{error}</div>}
        <div>
          <span>{formatDate(post.date)}</span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
