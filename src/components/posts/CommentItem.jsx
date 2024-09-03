import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { FaTrash } from 'react-icons/fa';

const CommentItem = ({ postId, comment, auth, onCommentDeleted }) => {
  const handleDelete = async () => {
    try {
      await api.delete(`/api/posts/comments/${postId}/${comment._id}`);
      if (onCommentDeleted) onCommentDeleted(comment._id); // Notify parent component
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <Card className="p-4 mb-4 bg-background shadow-md">
      <div className="flex items-center space-x-4 mb-2">
        <img src={comment.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <Link to={`/profile/${comment.user}`} className="text-blue-500 hover:underline">
            <h4 className="text-lg font-semibold">{comment.name}</h4>
          </Link>
          {auth.user._id === comment.user && (
            <Button onClick={handleDelete} variant="destructive" className="ml-2">
              <FaTrash />
            </Button>
          )}
        </div>
      </div>
      <p className="text-base break-words">{comment.text}</p>
    </Card>
  );
};

export default CommentItem;
