import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import PostItem from "../post/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({ user: { _id: "" } });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredComments, setFilteredComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post && post.comments) {
      setFilteredComments(
        post.comments.filter((comment) =>
          comment.text && comment.text.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, post]);

  const handleNewComment = (newComment) => {
    setPost((prevPost) => ({
      ...prevPost,
      comments: [newComment, ...prevPost.comments],
    }));
  };

  if (loading) return <Skeleton className="h-20 w-full" />;

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <PostItem post={post} />
      <Card className="p-4 bg-background mb-4 shadow-md mt-4">
        <h2 className="text-xl font-bold mb-2">Comment Area</h2>
        <CommentForm postId={post._id} onCommentAdded={handleNewComment} />
      </Card>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search comments..."
          className="p-2 border border-gray-300 rounded w-full bg-background text-foreground"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mt-4">
        {filteredComments.length > 0 ? (
          filteredComments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
              auth={auth}
            />
          ))
        ) : (
          <Card className="p-4 bg-background">No comments found.</Card>
        )}
      </div>
    </div>
  );
};

export default Post;
