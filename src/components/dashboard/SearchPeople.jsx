import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

// Functional component for rendering individual event
const Event = ({ event }) => {
  return (
    <div className="small-card inline-div mx-1">
      <div className="main">
        <div className="card" style={{ border: 'none' }}>
          <div className="card_image" style={{ width: '220px' }}>
            <Link to={`/gotoprofile/${event._id}`}>
              <img
                style={{ width: '230px', height: '250px' }}
                src={`https://placeimg.com/230/250?random=${Math.floor(Math.random() * 100)}`}
                alt={event.name}
              />
            </Link>
          </div>
          <div
            className="card_content"
            style={{ height: '50px', fontStyle: 'Clarendon Serif' }}
          >
            <h2 className="card_title">{event.name}</h2>
            <p className="card_text" style={{ paddingLeft: '10rem', fontStyle: 'Clarendon Serif' }}>
              {event.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main functional component
const SearchPeople = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    api.get('/api/auth/people')
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    api.put('/api/auth/peoplesearch', { searchme: searchTerm })
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <form className="search-container" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            id="search-bar"
            value={searchTerm}
            placeholder="Search for a User"
            onChange={handleSearchChange}
          />
          <input
            type="submit"
            className="search-icon"
            src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
            value="Search"
          />
        </form>
        <div className="container">
          {events.map(event => (
            <Event event={event} key={event._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPeople;
