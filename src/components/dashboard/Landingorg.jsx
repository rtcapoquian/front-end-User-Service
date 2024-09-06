import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../../api";
import { useToast } from "../../hooks/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Shadcn UI Button component
import { FaEllipsisV, FaSortUp, FaSortDown } from "react-icons/fa"; // Sorting icons
import { MdEdit, MdDelete, MdInfo } from "react-icons/md"; // Icons for Edit, Delete, and Details
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Ensure you import Dialog components

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("date"); // Default to sorting by date
  const [sortDirection, setSortDirection] = useState("desc"); // Default to descending
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate(); // Hook for navigation

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/api/events"); // Use the appropriate API endpoint
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast({
          title: "Error",
          description: "Failed to load events",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [toast]);

  // Handle event deletion
  const handleDeleteEvent = async () => {
    try {
      await api.delete(`/api/events/${eventToDelete}`); // Use the appropriate API endpoint
      setEvents(events.filter((event) => event._id !== eventToDelete));
      toast({
        title: "Success",
        description: "Event deleted successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
    setDeleteDialogOpen(false);
  };

  // Handle search and filtering
  useEffect(() => {
    let filtered = [...events];

    // Search by event name
    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filter based on selected option and sort direction
    if (filterOption === "date") {
      filtered = filtered.sort((a, b) => {
        return sortDirection === "desc"
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      });
    } else if (filterOption === "capacity") {
      filtered = filtered.sort((a, b) => {
        return sortDirection === "desc"
          ? b.capacity - a.capacity
          : a.capacity - b.capacity;
      });
    } else if (filterOption === "registered") {
      filtered = filtered.sort((a, b) => {
        return sortDirection === "desc"
          ? b.attendees.filter((att) => att.status === "Registered").length -
              a.attendees.filter((att) => att.status === "Registered").length
          : a.attendees.filter((att) => att.status === "Registered").length -
              b.attendees.filter((att) => att.status === "Registered").length;
      });
    } else if (filterOption === "waitingList") {
      filtered = filtered.sort((a, b) => {
        return sortDirection === "desc"
          ? b.attendees.filter((att) => att.status === "WaitingList").length -
              a.attendees.filter((att) => att.status === "WaitingList").length
          : a.attendees.filter((att) => att.status === "WaitingList").length -
              b.attendees.filter((att) => att.status === "WaitingList").length;
      });
    } else if (filterOption === "status") {
      filtered = filtered.sort((a, b) => {
        return sortDirection === "desc"
          ? b.status.localeCompare(a.status)
          : a.status.localeCompare(b.status);
      });
    }

    setFilteredEvents(filtered);
  }, [searchTerm, filterOption, sortDirection, events]);

  if (loading) return <div>Loading...</div>;

  // Determine sort indicator icon
  const getSortIndicator = (option) => {
    if (filterOption !== option) return null;
    return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div className="container mx-auto p-4 text-foreground">
      <h2 className="text-2xl font-semibold mb-4">Events</h2>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-3 sm:mb-0">
          <Input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xs"
          />
        </div>
        <div>
          <Button
            onClick={() => navigate("/Addevent")} // Navigate to the Add Event page
            variant="default"
            className="btn btn-main"
          >
            Create New Event
          </Button>
        </div>
      </div>
      <div className="card p-4 rounded-xl border bg-card text-card-foreground shadow">
        <Table>
          <TableCaption>A list of your events.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead
                onClick={() => {
                  setFilterOption("date");
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                }}
              >
                Date {getSortIndicator("date")}
              </TableHead>
              <TableHead
                onClick={() => {
                  setFilterOption("status");
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                }}
              >
                Status {getSortIndicator("status")}
              </TableHead>
              <TableHead
                onClick={() => {
                  setFilterOption("capacity");
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                }}
              >
                Capacity {getSortIndicator("capacity")}
              </TableHead>

              <TableHead
                onClick={() => {
                  setFilterOption("registered");
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                }}
              >
                Registered {getSortIndicator("registered")}
              </TableHead>
              <TableHead
                onClick={() => {
                  setFilterOption("waitingList");
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                }}
              >
                Waiting List {getSortIndicator("waitingList")}
              </TableHead>

              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map((event) => (
              // onclick navigate to /event/event._id
              <TableRow
                key={event._id}
                onClick={() => {
                  navigate(`/event/${event._id}`);
                }}
              >
                <TableCell>{event.name}</TableCell>
                <TableCell>
                  {new Date(event.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{event.status || "N/A"}</TableCell>
                <TableCell>{event.capacity}</TableCell>
                <TableCell>
                  {
                    event.attendees.filter((a) => a.status === "Registered")
                      .length
                  }
                </TableCell>
                <TableCell>
                  {
                    event.attendees.filter((a) => a.status === "WaitingList")
                      .length
                  }
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="btn btn-secondary btn-sm">
                        <FaEllipsisV />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => navigate(`/event/${event._id}/edit`)}
                      >
                        <MdEdit className="mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setEventToDelete(event._id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <MdDelete className="mr-2" />
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate(`/event/${event._id}`)}
                      >
                        <MdInfo className="mr-2" />
                        Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onOpenChange={() => setDeleteDialogOpen(false)}
      >
        <DialogContent className="text-foreground">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="default" onClick={handleDeleteEvent}>
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventList;
