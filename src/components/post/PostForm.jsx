import React, { useState } from 'react';
import api from '../../api';
const PostForm = () => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/posts', { text });
      setText('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          placeholder="Ask Something"
        ></textarea>
        <input
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default PostForm;
