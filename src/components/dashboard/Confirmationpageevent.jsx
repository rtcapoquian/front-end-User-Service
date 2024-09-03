import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';

const ConfirmationPageEvent = () => {
  const [activityName, setActivityName] = useState('');
  const { id } = useParams();  // Get the event ID from URL parameters

  useEffect(() => {
    api
      .get(`/api/auth/confirmations/${id}`)
      .then(response => {
        setActivityName(response.data[0].name);
      })
      .catch(error => console.log(error));
  }, [id]);  // Fetch data when the component mounts or id changes

  return (
    <div>
      <h1>You have registered for the event {activityName} successfully</h1>
    </div>
  );
};

export default ConfirmationPageEvent;
