import React, { useState } from "react";
import api from '../../api';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { FaComment } from 'react-icons/fa';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/api/posts/comment/${postId}`, { text });
      onCommentAdded(response.data); // Notify parent component of new comment
      setText(""); // Clear the textarea after submission
      window.location.reload(); // Refresh the page to reflect the new comment
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <Textarea
        name="text"
        rows="6"
        placeholder="Reply to this Post"
        value={text}
        onChange={e => setText(e.target.value)}
        required
      />
      <Button type="submit" variant="primary" className="flex items-center space-x-2">
        <FaComment />
        <span>Submit</span>
      </Button>
    </form>
  );
};

export default CommentForm;
