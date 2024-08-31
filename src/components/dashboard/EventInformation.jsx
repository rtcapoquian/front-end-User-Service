import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api'; // Importing the custom API
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
  <div>
    <img
      src="http://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-PNG-HD.png"
      alt="Map Marker"
      style={{ height: '50px', width: '50px' }}
    />
    {text}
  </div>
);

const EventInformation = () => {
  const { id } = useParams(); // Replacing match.params with useParams
  const [eventDetails, setEventDetails] = useState({
    name: '',
    information: '',
    longitude: 0,
    latitude: 0,
    capacity: 5,
    date: new Date(),
    pay: '',
    address: '',
    stringDates: [],
    showmessage: true,
    disabled1: false,
  });

  useEffect(() => {
    api
      .get(`/api/auth/show/${id}`)
      .then((response) => {
        const event = response.data[0];
        setEventDetails({
          ...eventDetails,
          name: event.name,
          longitude: event.longitude,
          latitude: event.latitude,
          capacity: event.Capacity,
          date: event.Date,
          information: event.information,
          pay: event.pay,
          address: event.address,
          stringDates: event.StringDates || [],
        });
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { capacity, name } = eventDetails;
    api
      .post('/api/auth/capacity', { capacity: capacity - 1, name })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const renderRegisterButton = () => {
    const { pay, disabled1 } = eventDetails;
    const linkPath = pay === 'paid' ? '/paymentq' : `/payment/${id}`;

    return (
      <button onClick={handleSubmit} disabled={disabled1}>
        <Link to={linkPath}>Register</Link>
      </button>
    );
  };

  const { name, information, latitude, longitude, address, stringDates, capacity, showmessage } = eventDetails;

  return (
    <div>
      <h2>{name}</h2>
      <p>{information}</p>
      <p>{stringDates.length > 0 ? `${stringDates[0]} - ${stringDates[1]}` : 'Dates not available'}</p>
      <p>Location: {address}</p>
      <p>Capacity: {capacity}</p>
      {!showmessage && <p>This event is full. You will be put on the waitlist if you register.</p>}

      {renderRegisterButton()}

      <GoogleMapReact
        bootstrapURLKeys={{ key: "YOUR_VALID_GOOGLE_MAPS_API_KEY" }}
        center={{ lat: latitude, lng: longitude }}
        defaultZoom={15}
      >
        <AnyReactComponent lat={latitude} lng={longitude} text={name} />
      </GoogleMapReact>
    </div>
  );
};

export default EventInformation;
