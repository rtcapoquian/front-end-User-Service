// pages/landing.js
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Link } from 'react-router-dom';
import { FaRegCalendarAlt, FaUser, FaSearch, FaCommentDots, FaChartLine, FaPhoneAlt, FaAws } from 'react-icons/fa';
import awss1 from '../layout/awspics/image1.jpg';
import awws2 from '../layout/awspics/aws1.jpg';

export default function Landing() {
  return (
    <div className="bg-gray-100 min-h-screen dark:bg-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white py-20"
        style={{ backgroundImage: `url(${awss1})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
            Welcome to Our Event App!
          </h1>
          <p className="text-xl mb-8 drop-shadow-md">
            Everything you need to manage your events effectively and connect with others.
          </p>
          <Link to="/login"> <Button className="bg-yellow-500 text-black py-2 px-4 rounded shadow-md">
            Get Started
          </Button></Link>
          <div className="flex items-center justify-center mt-8">
            <FaAws className="text-white text-3xl mr-2" />
            <h3 className="text-lg font-medium drop-shadow-md">Powered by AWS</h3>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <Card className="p-6 shadow-md">
              <div className="flex items-center mb-4">
                <FaRegCalendarAlt className="text-blue-500 text-3xl mr-4" />
                <h3 className="text-xl font-semibold">Attendee Registration & Event Management</h3>
              </div>
              <p className="mb-4">
                Attendees can register for events, receive confirmations, and waitlist if necessary. Organizers can create, edit, and manage events, view and filter attendees, confirm registrations, and send QR codes.
              </p>
              <Link to="/features/registration-management">
                <a className="text-blue-500 hover:underline">Learn More</a>
              </Link>
            </Card>

            <Card className="p-6 shadow-md">
              <div className="flex items-center mb-4">
                <FaUser className="text-blue-500 text-3xl mr-4" />
                <h3 className="text-xl font-semibold">Profile Management</h3>
              </div>
              <p className="mb-4">
                Organizers and attendees can create, manage, and view profiles. Chat functionalities and profile views for better networking and connections.
              </p>
              <Link to="/features/profile-management">
                <a className="text-blue-500 hover:underline">Learn More</a>
              </Link>
            </Card>

            <Card className="p-6 shadow-md">
              <div className="flex items-center mb-4">
                <FaSearch className="text-blue-500 text-3xl mr-4" />
                <h3 className="text-xl font-semibold">Event Search & Filtering</h3>
              </div>
              <p className="mb-4">
                Attendees can search for events using keywords, and filters like date, location, and type. Organizers can filter attendees and view QR code data.
              </p>
              <Link to="/features/event-search">
                <a className="text-blue-500 hover:underline">Learn More</a>
              </Link>
            </Card>

            <Card className="p-6 shadow-md">
              <div className="flex items-center mb-4">
                <FaCommentDots className="text-blue-500 text-3xl mr-4" />
                <h3 className="text-xl font-semibold">Feedback & Forums</h3>
              </div>
              <p className="mb-4">
                Attendees can leave feedback, rate events, and participate in forums. Organizers can create forums for event-specific discussions.
              </p>
              <Link to="/features/feedback-forums">
                <a className="text-blue-500 hover:underline">Learn More</a>
              </Link>
            </Card>

            <Card className="p-6 shadow-md">
              <div className="flex items-center mb-4">
                <FaChartLine className="text-blue-500 text-3xl mr-4" />
                <h3 className="text-xl font-semibold">Forums Details</h3>
              </div>
              <p className="mb-4">
                Create forums with topics, threads, posts, comments, and reactions. Features include anonymous posting and forum home with search, categories, and featured content.
              </p>
              <Link to="/features/forums-details">
                <a className="text-blue-500 hover:underline">Learn More</a>
              </Link>
            </Card>

            <Card className="p-6 shadow-md">
              <div className="flex items-center mb-4">
                <FaPhoneAlt className="text-blue-500 text-3xl mr-4" />
                <h3 className="text-xl font-semibold">Advanced Features</h3>
              </div>
              <p className="mb-4">
                Implement a chatbot for assistance, provide personalized event recommendations, and use AI for improved attendee matching and interactions.
              </p>
              <Link to="/features/advanced-features">
                <a className="text-blue-500 hover:underline">Learn More</a>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="relative bg-cover bg-center py-20 dark:bg-gray-800 text-white"
        style={{ backgroundImage: `url('${awws2}')` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 drop-shadow-lg">Get In Touch</h2>
          <p className="mb-4 drop-shadow-md">Have questions or need support? Contact us anytime.</p>
          <Link to="/contact"><Button className="bg-green-500 text-white py-2 px-4 rounded shadow-md">
           Contact Us
          </Button></Link>
          <div className="flex items-center justify-center mt-8">
            <FaAws className="text-white text-3xl mr-2" />
            <h3 className="text-lg font-medium drop-shadow-md">Powered by AWS</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
