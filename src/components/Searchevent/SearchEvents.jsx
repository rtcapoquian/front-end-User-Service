import React, { Component } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import EventCard from "./EventCard"; // Updated import for EventCard
import api from "@/api";
import { FaSort } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default class SearchEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchme: "",
      events: [],
      sortOption: "dateAsc", // Default sort option
    };

    this.searchh = this.searchh.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents() {
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

  handleSortChange(option) {
    this.setState({ sortOption: option }, () => {
      this.sortEvents();
    });
  }

  sortEvents() {
    const { events, sortOption } = this.state;
    let sortedEvents = [...events];
  
    sortedEvents.sort((a, b) => {
      const dateA = new Date(a.date.$date || a.date);
      const dateB = new Date(b.date.$date || b.date);
  
      if (sortOption === "dateAsc") {
        return dateA - dateB;
      } else if (sortOption === "dateDesc") {
        return dateB - dateA;
      } else if (sortOption === "capacityAsc") {
        return a.capacity - b.capacity;
      } else if (sortOption === "capacityDesc") {
        return b.capacity - a.capacity;
      }
  
      return 0;
    });
  
    this.setState({ events: sortedEvents });
  }
  

  renderEventsList() {
    const filteredEvents = this.state.events.filter(event =>
      event.name.toLowerCase().includes(this.state.searchme.toLowerCase())
    );

    return filteredEvents.map((event) => (
      <EventCard event={event} key={event._id} />
    ));
  }

  render() {
    const { sortOption } = this.state;
    const sortOptions = {
      dateAsc: "Date Ascending",
      dateDesc: "Date Descending",
      capacityAsc: "Capacity Ascending",
      capacityDesc: "Capacity Descending",
    };

    return (
      <div className="min-h-screen bg-background text-foreground p-4">
        <form onSubmit={this.onSubmit} className="mb-4">
          <Input
            type="text"
            value={this.state.searchme}
            placeholder="Search for an Event"
            onChange={this.searchh}
            className="w-full max-w-md mx-auto mb-4 bg-input text-foreground placeholder-gray-500"
          />
        </form>

        <div className="mb-8 flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="p-4 border border-border rounded bg-card text-foreground text-lg">
              <FaSort className="mr-2" />
                {sortOptions[sortOption]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card text-foreground">
              <DropdownMenuLabel className="text-lg">Sort Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Object.keys(sortOptions).map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => this.handleSortChange(option)}
                  className={option === sortOption ? 'bg-accent text-foreground' : ''}
                >
                  {sortOptions[option]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {this.renderEventsList()}
        </div>
      </div>
    );
  }
}
