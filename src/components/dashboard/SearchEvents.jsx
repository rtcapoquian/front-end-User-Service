import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../api"; // Import the API instance


const Events = props => (
  <div className="small-card">
    <div className="card">
      <Link to={"/edit/" + props.events._id}>
      
        <div className="card_content">
          <h2>{props.events.name}</h2>
          <p>{props.events.location} | {props.events.age}</p>
        </div>
      </Link>
    </div>
  </div>
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
    api.get("/api/auth/show")
      .then(response => {
        this.setState({ events: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  searchh(e) {
    this.setState({ searchme: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    api.put("/api/auth/showss", { searchme: this.state.searchme })
      .then(response => {
        this.setState({ events: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderEventsList() {
    return this.state.events.map(event => <Events events={event} key={event._id} />);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.searchme}
            placeholder="Search for an Event"
            onChange={this.searchh}
          />
        </form>
        <div>
          {this.renderEventsList()}
        </div>
      </div>
    );
  }
}
