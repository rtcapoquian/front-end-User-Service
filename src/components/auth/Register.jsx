import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../API_URL';
import Slideshow from '../layout/Slideshow';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useEffect } from 'react';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    type_of_user: 'Attendee',
    question1: '',
    answer1: '',
    question2: '',
    answer2: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');



  const {
    name,
    email,
    password,
    password2,
    type_of_user,
    question1,
    answer1,
    question2,
    answer2,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setError('Passwords do not match.');
    } else if (!question1) {
      setError('Please select a security question.');
    } else {
      try {
        const response = await axios.post(`${API_URL}/users`, {
          name,
          email,
          password,
          type_of_user,
          question1,
          answer1,
          question2,
          answer2,
        });

        const { token, userType, user_id } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('userType', userType);
        localStorage.setItem('user_id', user_id);

        setSuccess('Registration successful!');
        setError('');

        navigate('/login');
      } catch (err) {
        setError(err.response.data.errors.map((e) => e.msg).join(', '));
        setSuccess('');
      }
    }
  };

  return (
    <Fragment>
      <section className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/2 relative">
          <Slideshow />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 text-foreground">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Register Now!
            </h2>
            <form onSubmit={onSubmit} className="space-y-6">
              <Input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
                className="focus:ring-blue-500"
              />
              <Input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={onChange}
                className="focus:ring-blue-500"
              />
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                className="focus:ring-blue-500"
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={onChange}
                className="focus:ring-blue-500"
              />
              <select
                name="type_of_user"
                value={type_of_user}
                onChange={onChange}
                className="block w-full p-2 border rounded focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              >
                <option value="Attendee">Attendee</option>
                <option value="Organizer">Organizer</option>
              </select>
              <select
                name="question1"
                value={question1}
                onChange={onChange}
                className="block w-full p-2 border rounded focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select Security Question</option>
                <option value="Your First Pet's Name">Your First Pet's Name</option>
                <option value="Your Father's First Name">Your Father's First Name</option>
                <option value="Your Mother's Maiden Name">Your Mother's Maiden Name</option>
                <option value="Your High School's Name">Your High School's Name</option>
                <option value="The City You Were Born In">The City You Were Born In</option>
              </select>
              <Input
                type="text"
                placeholder="Enter Answer Here"
                name="answer1"
                value={answer1}
                onChange={onChange}
                className="focus:ring-blue-500"
              />
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition-colors duration-300"
              >
                Register
              </Button>
              <p className="text-gray-700 dark:text-gray-300">
                Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-600">Sign In</Link>
              </p>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Register;
