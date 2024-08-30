import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import PostItem from '../post/PostItem';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({ user: { _id: '' } }); // Simulate authentication state

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/api/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <PostItem post={post} />
      <CommentForm postId={post._id} />
      <div>
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} auth={auth} />
        ))}
      </div>
    </div>
  );
};

export default Post;
