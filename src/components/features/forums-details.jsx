// pages/features/forums-details.js
import { Card } from '../ui/card';
import { FaList, FaCommentAlt } from 'react-icons/fa';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export default function ForumsDetails() {
  const navigate = useNavigate();


  return (
    <div className="bg-gray-100 min-h-screen dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-8 text-center">Forums Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <Card className="p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaList className="text-blue-500 text-4xl mr-4" />
              <h2 className="text-2xl font-semibold">Forum Structure</h2>
            </div>
            <p>
              Learn how forums are structured, including categories, threads, and posts.
            </p>
          </Card>

          <Card className="p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaCommentAlt className="text-blue-500 text-4xl mr-4" />
              <h2 className="text-2xl font-semibold">Participate in Discussions</h2>
            </div>
            <p>
              Engage in discussions, reply to posts, and contribute to community conversations.
            </p>
          </Card>
        </div>
        <div className="text-center mt-12">
          <Button className="bg-yellow-500 text-black py-2 px-4 rounded shadow-md">
            <a  onClick={() => navigate(-1)} >Back</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
