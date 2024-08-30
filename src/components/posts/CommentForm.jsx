import React, { useState } from "react";
import api from '../../api';

const CommentForm = ({ postId }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/posts/comment/${postId}`, { text });
      setText("");
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="text"
        cols="30"
        rows="5"
        placeholder="Reply to this Post"
        value={text}
        onChange={e => setText(e.target.value)}
        required
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CommentForm;
