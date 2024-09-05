import React, { useEffect, useState } from 'react';
import api from '../../api';
import PostForm from './PostForm';
import PostItem from './PostItem';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Input } from '../ui/input';
import { FaSearch } from 'react-icons/fa'; // Import icon

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(false); // Add refresh state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/api/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [refresh]); // Depend on refresh

  const handlePostUpdated = () => {
    setRefresh(!refresh); // Toggle refresh state
  };

  const filteredPosts = posts.filter(post =>
    post.name.toLowerCase().includes(search.toLowerCase()) ||
    post.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <header className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Forum</h1>
      </header>
      
      {/* Search form with icon */}
      <div className="mb-4 flex items-center space-x-2 text-foreground">
        <Input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-2 w-full"
        />
        <FaSearch className="text-gray-500" />
      </div>
      
      {/* PostForm */}
      <PostForm onPostCreated={handlePostUpdated} />
      
      {/* Search results */}
      {loading ? (
        <Skeleton className="h-20 w-full" />
      ) : (
        <div>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <PostItem key={post._id} post={post} onPostUpdated={handlePostUpdated} />
            ))
          ) : (
            <Card className="p-4">No posts available.</Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Posts;
