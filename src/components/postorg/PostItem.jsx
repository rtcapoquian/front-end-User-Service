import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Alert } from '../ui/alert';
import { FaThumbsUp, FaThumbsDown, FaTrash } from 'react-icons/fa'; // Import icons

const PostItem = ({ post, onPostUpdated }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [error, setError] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleLike = async () => {
    try {
      await api.put(`/api/posts/like/${post._id}`);
      setLikes(likes + 1);
      setError(null);
    } catch (error) {
      console.error('Error liking post:', error);
      setError('Failed to like post.');
    }
  };

  const handleUnlike = async () => {
    try {
      await api.put(`/api/posts/unlike/${post._id}`);
      setLikes(likes - 1);
      setError(null);
    } catch (error) {
      console.error('Error unliking post:', error);
      setError('Failed to unlike post.');
    }
  };

  const handleDelete = () => {
    setShowDialog(true); // Show confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/posts/${post._id}`);
      onPostUpdated(); // Notify parent component
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post.');
    }
    setShowDialog(false); // Hide dialog
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <Card className="p-4 mb-4 bg-background shadow-md mx-auto max-w-2xl">
      <div className="flex items-center justify-between mb-2">
       <Link to={`/gotoprofileorg/${post.user}`}> <h4 className="text-lg font-semibold text-blue-500">{post.name}</h4></Link>
        <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
      </div>
      <p className="mb-8">{post.text}</p>
      <div className="flex items-center justify-center space-x-2">
        <Button onClick={handleLike} variant="outline" className="flex items-center space-x-1">
          <FaThumbsUp /> {/* Icon for Like */}
          <span>{likes}</span>
        </Button>
        <Button onClick={handleUnlike} variant="outline" className="flex items-center space-x-1">
          <FaThumbsDown /> {/* Icon for Unlike */}
        </Button>
        <Link to={`/postsorg/${post._id}`} className="text-blue-500 hover:underline">Comments {post.comments.length}</Link>
        <Button onClick={handleDelete} variant="destructive" className="flex items-center space-x-1">
          <FaTrash /> {/* Icon for Delete */}
        </Button>
      </div>
      {error && <Alert variant="destructive" className="mt-2">{error}</Alert>}

      {/* Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-80">
          <Card className="p-4 bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Confirm Delete</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">Are you sure you want to delete this post?</p>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setShowDialog(false)} variant="outline">Cancel</Button>
              <Button onClick={confirmDelete} variant="destructive">Confirm</Button>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
};

export default PostItem;
