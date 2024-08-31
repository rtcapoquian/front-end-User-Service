import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api';
import Navbar from '../layout/Navbar';

const Events = ({ event }) => (
  <div className="event-card">
    <div className="card-content">
      <Link to={`/edit/${event._id}`}>
        <img
          src="https://via.placeholder.com/230x250"
          alt={event.name}
          width="230px"
          height="250px"
        />
      </Link>
      <h2>{event.name}</h2>
      <p>Location: {event.location}</p>
      <p>Age: {event.age}</p>
    </div>
  </div>
);

const Waitinglistevent = () => {
  const { id } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/api/auth/regievent/${id}`);
        const activityNames = response.data[0]?.Waitinglistevent || [];
        const eventsResponse = await api.put('/api/auth/getwaitl', { activitynames: activityNames });
        setEvents(eventsResponse.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEventDetails();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="container">
        {events.map(event => (
          <Events event={event} key={event._id} />
        ))}
      </div>
    </>
  );
};

export default Waitinglistevent;
