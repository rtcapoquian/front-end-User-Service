import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
const Events = ({ event }) => (
  <div>
    <div>
      <img src={event.snippet1} alt="Event" />
      <h2>{event.name}</h2>
    </div>
  </div>
);

const Bloomingtons = ({ bloomington }) => (
  <div>
    <img src={bloomington.img} alt="Bloomington" />
    <p>{bloomington.name}</p>
  </div>
);

const Venues = ({ venue }) => (
  <div>
    <img src={venue.snippet2} alt="Venue" />
    <h2>{venue.name}</h2>
    <p>{venue.location}</p>
    <p>{venue.age}</p>
    <button>
      <Link to={`/edits/${venue._id}`}>Details</Link>
    </button>
  </div>
);

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      events: [],
      bloomington: [],
      location: 'Bloomington',
    };
  }

  componentDidMount() {
    api
      .get('/auth/show')
      .then(response => this.setState({ events: response.data }))
      .catch(error => console.log(error));

    api
      .put('/auth/locationbloomington', { location: 'Bloomington' })
      .then(response => this.setState({ bloomington: response.data }))
      .catch(error => console.log(error));

    api
      .get('/auth/venues')
      .then(response => this.setState({ event: response.data }))
      .catch(error => console.log(error));

    api
      .get('/auth/locations')
      .then(response => this.setState({ events: response.data }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <div>
              <div>
                <Link to="/SearchEvents">
                  <div>
                    <img src="path_to_villas_image" alt="Events" />
                    <p>Events</p>
                  </div>
                </Link>
              </div>
              <div>
                <Link to="/SearchVenue">
                  <div>
                    <img src="path_to_events_image" alt="Stays" />
                    <p>Stays</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h3>Events Near you</h3>
            {/* Removed Carousel */}
            <h3>Places to Visit</h3>
            <div>
              {this.state.event.map(venue => (
                <Venues key={venue._id} venue={venue} />
              ))}
            </div>
            <div>
              {this.state.events.map(event => (
                <Events key={event._id} event={event} />
              ))}
            </div>
            <div>
              {this.state.bloomington.map(bloomington => (
                <Bloomingtons key={bloomington._id} bloomington={bloomington} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
