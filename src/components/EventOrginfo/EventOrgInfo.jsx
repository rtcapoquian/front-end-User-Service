import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import ChatBotOrg from "@/ChatBotOrg.jsx";
const statusColors = {
  WaitingList: "bg-yellow-200 text-yellow-800",
  Registered: "bg-green-200 text-green-800",
  Declined: "bg-red-200 text-red-800",
  Pending: "bg-gray-200 text-gray-800",
};

const EventOrgInfo = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showFinalizeDialog, setShowFinalizeDialog] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(null);
  const { toast } = useToast();

  const fetchEvent = async () => {
    try {
      const response = await api.get(`/api/events/${id}`);
      setEvent(response.data);

      const userRequests = response.data.attendees.map((attendee) =>
        api.get(`/api/users/${attendee.user_id}`)
      );
      const userResponses = await Promise.all(userRequests);
      const userDetails = userResponses.reduce((acc, curr) => {
        acc[curr.data._id] = curr.data;
        return acc;
      }, {});
      setUsers(userDetails);
    } catch (err) {
      console.error("Error fetching event:", err);
      setError("Failed to load event details.");
      toast({
        title: "Error",
        description: "Failed to load event details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const updateAttendeeStatus = async (attendeeId, newStatus) => {
    try {
      await api.patch(`/api/events/${id}/attendees/${attendeeId}/status`, {
        status: newStatus,
      });
      await fetchEvent();
    } catch (err) {
      console.error("Error updating attendee status:", err);
      setError("Failed to update attendee status.");
      toast({
        title: "Error",
        description: "Failed to update attendee status.",
        variant: "destructive",
      });
    }
  };

  const handleFinalize = async () => {
    try {
      await api.post(`/api/events/${id}/finalize`);
      fetchEvent();
      setShowFinalizeDialog(false);
    } catch (err) {
      console.error("Error finalizing registrations:", err);
      setError("Failed to finalize registrations.");
      toast({
        title: "Error",
        description: "Failed to finalize registrations.",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const filteredAttendees = event.attendees
    .map((attendee) => ({
      ...attendee,
      user: users[attendee.user_id] || {},
    }))
    .filter(
      (attendee) =>
        attendee.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const sortedAttendees = filteredAttendees.sort((a, b) => {
    const aValue = a[sortOption];
    const bValue = b[sortOption];

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (option) => {
    if (sortOption === option) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortOption(option);
      setSortDirection("asc");
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) =>
      index < rating ? (
        <AiFillStar key={index} className="text-yellow-500" />
      ) : (
        <AiOutlineStar key={index} className="text-yellow-500" />
      )
    );
  };

  return (
    <div className="container mx-auto p-4 text-foreground">
<ChatBotOrg id={id}/>
      {event && (
        <div className="card p-4 rounded-xl border bg-card text-card-foreground shadow">
          <div className="mb-4">
            
            <img
              src={event.image || "https://via.placeholder.com/800x400"}
              alt={event.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
          <table className="table mb-4">
            <tbody>
              <tr>
                <td className="font-semibold">Event Name:</td>
                <td>{event.name}</td>
              </tr>
              <tr>
                <td className="font-semibold">Organizer:</td>
                <td>{event.organizer?.name || "N/A"}</td>
              </tr>
              <tr>
                <td className="font-semibold">Date:</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="font-semibold">Time:</td>
                <td>{event.time}</td>
              </tr>
              <tr>
                <td className="font-semibold">Address:</td>
                <td>{event.address}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mb-4">Attendees</h3>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <Input
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 mb-2 md:mb-0"
            />
            <DropdownMenu>
              <DropdownMenuTrigger className="btn btn-secondary">
                Sort By:{" "}
                {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
                {sortDirection === "asc" ? (
                  <FaSortUp className="ml-2" />
                ) : (
                  <FaSortDown className="ml-2" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleSort("name")}>
                  Name
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("status")}>
                  Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("qr_code")}>
                  QR Code
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("rating")}>
                  Rating
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table>
            <TableCaption>A list of attendees for the event.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Status
                    <span className="ml-2">
                      {sortOption === "status" &&
                        (sortDirection === "asc" ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        ))}
                    </span>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    QR Code
                    <span className="ml-2">
                      {sortOption === "qr_code" &&
                        (sortDirection === "asc" ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        ))}
                    </span>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Rating
                    <span className="ml-2">
                      {sortOption === "rating" &&
                        (sortDirection === "asc" ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        ))}
                    </span>
                  </div>
                </TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAttendees.map((attendee) => (
                <TableRow key={attendee._id}>
                  <TableCell>
                    <Link
                      to={`/gotoprofileorg/${attendee.user._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {attendee.user.name}
                    </Link>
                  </TableCell>
                  <TableCell>{attendee.user.email}</TableCell>
                  <TableCell>
                    <div
                      className={`px-2 py-1 rounded ${
                        statusColors[attendee.status]
                      }`}
                    >
                      {attendee.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    {attendee.qr_code ? "QR code available" : "No QR code"}
                  </TableCell>
                  <TableCell>
                    <Link to={`/feedback/${event._id}/${attendee.user_id}`}>
                      {renderStars(attendee.rating)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        updateAttendeeStatus(
                          attendee.user_id,
                          attendee.status === "Registered"
                            ? "WaitingList"
                            : "Registered"
                        )
                      }
                    >
                      {attendee.status === "Registered"
                        ? "Mark as Waiting"
                        : "Register"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4">
          <div className="flex justify-between items-center mt-4">
  <Link to={`/event/${id}/scan-qr`} className="btn btn-primary mb-3">
    <Button variant="outline">Scan QR Codes</Button>
  </Link>
  <Button onClick={() => setShowFinalizeDialog(true)} className="mr-2">
    Finalize Registrations
  </Button>
</div>

            <Dialog
              open={showFinalizeDialog}
              onOpenChange={setShowFinalizeDialog}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-foreground">Finalize Registrations</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to finalize the registrations for this
                    event? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end mt-4">
                  <Button onClick={handleFinalize}>Finalize</Button>
                  <Button
                    onClick={() => setShowFinalizeDialog(false)}
                    className="ml-2"
                  >
                    Cancel
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventOrgInfo;
