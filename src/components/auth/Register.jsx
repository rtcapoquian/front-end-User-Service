import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { API_URL } from '../../API_URL';


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

  const navigate = useNavigate(); // Initialize useNavigate

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

        // Assuming the response contains these values
        const { token, userType, user_id } = response.data;
        
        // Save token, userType, and user_id to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userType', userType);
        localStorage.setItem('user_id', user_id);

        setSuccess('Registration successful!');
        setError('');

        // Redirect to the signin page after successful registration
        navigate('/login');
      } catch (err) {
        setError(err.response.data.errors.map((e) => e.msg).join(', '));
        setSuccess('');
      }
    }
  };

  return (
    <Fragment>
      <section className="formslayout">
        <div className="formslayout-inner">
          <div className="page">
            <div className="register">
              <div className="formulaire">
                <h2 className="text-center" style={{ color: 'black' }}>Register Now!</h2>
                <form onSubmit={onSubmit}>
                  <input
                    type="text"
                    style={{ height: '35px', border: 'none', marginBottom: '10px' }}
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={onChange}
                  />
                  <input
                    type="email"
                    style={{ height: '35px', border: 'none', marginBottom: '10px' }}
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={onChange}
                  />
                  <input
                    type="password"
                    style={{ height: '35px', border: 'none', marginBottom: '10px' }}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                  />
                  <input
                    type="password"
                    style={{ height: '35px', border: 'none', marginBottom: '10px' }}
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                  />
                  <select
                    value={type_of_user}
                    className="input2"
                    style={{ textAlign: 'center', border: 'none', height: '35px', marginBottom: '10px' }}
                    name="type_of_user"
                    onChange={onChange}
                  >
                    <option value="Attendee">Attendee</option>
                    <option value="Organizer">Organizer</option>
                  </select>
                  <select
                    value={question1}
                    className="input2"
                    style={{ border: 'none', height: '35px', marginBottom: '10px' }}
                    name="question1"
                    onChange={onChange}
                  >
                    <option value="">Select Security Question</option>
                    <option value="Your First Pets Name">Your First Pet's Name</option>
                    <option value="Your Father's First Name">Your Father's First Name</option>
                    <option value="Your Mother's Maiden Name">Your Mother's Maiden Name</option>
                    <option value="Your High School's Name">Your High School's Name</option>
                    <option value="The City You Were Born In">The City You Were Born In</option>
                  </select>
                  <input
                    type="text"
                    style={{ height: '35px', width: '90%', marginBottom: '10px' }}
                    placeholder="Enter Answer Here"
                    name="answer1"
                    value={answer1}
                    onChange={onChange}
                  />
                  <input
                    type="submit"
                    style={{
                      height: '35px',
                      marginTop: '20px',
                      width: '30%',
                      backgroundColor: '#17a2b8',
                      fontSize: '1.2rem',
                      color: 'black',
                    }}
                    value="Register"
                  />
                  <p className="forgot" style={{ color: 'black' }}>
                    Already have an account? <Link to="/login">Sign In</Link>
                  </p>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Register;
