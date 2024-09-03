import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../api"; // Import the API instance
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

const EventCard = ({ event }) => (
  <Card className="p-4 mb-4 shadow-md border border-gray-200 rounded-lg">
    <Link
      to={`/edit/${event._id}`}
      className="block hover:bg-gray-100 p-2 rounded-md"
    >
      <h2 className="text-lg font-semibold text-gray-900">{event.name}</h2>
      <p className="text-gray-700">
        {event.location} | {event.age}
      </p>
    </Link>
  </Card>
);

export default class SearchEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchme: "",
      events: [],
    };

    this.searchh = this.searchh.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    api
      .get("/api/auth/show")
      .then((response) => {
        this.setState({ events: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  searchh(e) {
    this.setState({ searchme: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    api
      .put("/api/auth/showss", { searchme: this.state.searchme })
      .then((response) => {
        this.setState({ events: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderEventsList() {
    return this.state.events.map((event) => (
      <EventCard event={event} key={event._id} />
    ));
  }

  render() {
    return (
      <div>
        <div className="min-h-screen bg-gray-50 p-4">
          <form onSubmit={this.onSubmit} className="mb-4">
            <Input
              type="text"
              value={this.state.searchme}
              placeholder="Search for an Event"
              onChange={this.searchh}
              className="w-full max-w-md mx-auto"
            />
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {this.renderEventsList()}
          </div>
        </div>
      </div>
    );
  }
}
