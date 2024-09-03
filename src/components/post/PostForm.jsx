import React, { useState } from 'react';
import api from '../../api';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { FaPaperPlane } from 'react-icons/fa'; // Import icon

const PostForm = ({ onPostCreated }) => {
  const [text, setText] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowDialog(true); // Show confirmation dialog
  };

  const confirmSubmit = async () => {
    try {
      await api.post('/api/posts', { text });
      setText('');
      onPostCreated(); // Notify parent component
    } catch (error) {
      console.error('Error creating post:', error);
    }
    setShowDialog(false); // Hide dialog
  };

  return (
    <Card className="p-4 bg-background mb-4 mx-auto max-w-2xl">
      <form onSubmit={handleSubmit}>
        <Textarea
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          placeholder="What's on your mind?"
          className="mb-4"
        />
        <Button type="submit" variant="outline" className="flex items-center space-x-2">
          <FaPaperPlane /> {/* Icon for Submit */}
          <span>Submit</span>
        </Button>
      </form>
      
      {/* Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-80">
          <Card className="p-4 bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Confirm Submit</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">Are you sure you want to submit this post?</p>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setShowDialog(false)} variant="outline">Cancel</Button>
              <Button onClick={confirmSubmit} variant="outline">Confirm</Button>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
};

export default PostForm;
