import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
//from auth
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Resetpass from "./components/auth/Resetpass";
import Sende from "./components/auth/Sende";
import Navbar from "./components/layout/Navbar";
import NavbarOrg from "./components/layout/NavbarOrg";
//from profile-forms
import AddEducation from "./components/profile-forms/AddEducation";
import AddExperience from "./components/profile-forms/AddExperience";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddEvent from "./components/profile-forms/Addevent";
//from profile
import Profile from "./components/profile/Profile";
import Profiles from "./components/profiles/Profiles";
//test
import Landing from "./components/layout/Landing";
import DASHBOARDORG from "./components/dashboard/dashboardOrg";
import Landingorg from "./components/dashboard/Landingorg";
//faq and terms
import Faq from "./components/layout/faq";
import Termsandpolicy from "./components/layout/termsandpolicy";
//post
import Posts from "./components/post/Posts";
import Post from "./components/posts/Post";
//landing page
import LandingPage from "./components/dashboard/LandingPage";
import Dashboard from "./components/dashboard/Dashboard";
import EventOrgInfo from "./components/EventOrginfo/EventOrgInfo";
//registered event
import RegisteredEvent from "./components/dashboard/RegisteredEvent";
import Waitinglistevent from "./components/dashboard/Waitinglistevent";
import SearchEvents from "./components/Searchevent/SearchEvents";
import EventInformation from "./components/dashboard/EventInformation";
import Paymentevents from "./components/profile-forms/Paymentevents";
import Confirmationpageevent from "./components/dashboard/Confirmationpageevent";
import SearchPeople from "./components/dashboard/SearchPeople";
import ProfileInformation from "./components/dashboard/ProfileInformation";
import EditEvent from "./components/profile-forms/EditEvent";
import ScanQr from "./components/profile-forms/ScanQr";
import Chatscreen from "./components/chat/Chatscreen";
import GiveFeedback from "./components/chat/GiveFeedback";
import EventFeedback from "./components/EventOrginfo/EventFeedback";
import PostsOrg from "./components/postorg/Posts";
import PostOrg from "./components/postsorg/Post";
import SearchPeopleOrg from "./components/chat/SearchPeopleOrg";
import AboutUs from "./components/auth/AboutUs";
import Contact from "./components/auth/Contact";
import RegistrationManagement from "./components/features/registration-management";
import ProfileManagement from "./components/features/profile-management";
import EventSearch from "./components/features/event-search";
import FeedbackForums from "./components/features/feedback-forums";
import ForumsDetails from "./components/features/forums-details";
import AdvancedFeatures from "./components/features/advanced-features";
import CharBot from "./ChatBot";


function App() {
  return (
    <>
      <BrowserRouter>
        <CharBot />

        <Routes>
          <Route exact path="/chatbot" element={<CharBot />} />
          <Route
            exact
            path="/features/advanced-features"
            element={<AdvancedFeatures />}
          />
          <Route
            exact
            path="/features/feedback-forums"
            element={<FeedbackForums />}
          />
          <Route
            exact
            path="/features/forums-details"
            element={<ForumsDetails />}
          />
          <Route
            exact
            path="/features/event-search"
            element={<EventSearch />}
          />
          <Route
            exact
            path="/features/profile-management"
            element={<ProfileManagement />}
          />
          <Route
            exact
            path="/features/registration-management"
            element={<RegistrationManagement />}
          />
          <Route
            exact
            path="/registration-management"
            element={<RegistrationManagement />}
          />

          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about" element={<AboutUs />} />
          <Route
            exact
            path="/postsorg/:id"
            element={
              <>
                <NavbarOrg />
                <PostOrg />
              </>
            }
          />
          <Route
            path="/feedback/:event_id/:user_id"
            element={
              <>
                <NavbarOrg />
                <EventFeedback />
              </>
            }
          />
          <Route
            path="/givefeedback/:id"
            element={
              <>
                <Navbar />
                <GiveFeedback />
              </>
            }
          />
          <Route exact path="/" element={<Landing />} />
          {/* ROutes */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/Sende" element={<Sende />} />
          <Route exact path="/resetpass/:id" element={<Resetpass />} />
          {/* End of Routes */}
          <Route
            exact
            path="/dashboardOrg"
            element={
              <>
                <NavbarOrg />
                <DASHBOARDORG />
              </>
            }
          />
          <Route
            exact
            path="/addevent"
            element={
              <>
                <NavbarOrg />
                <AddEvent />
              </>
            }
          />
          <Route
            exact
            path="/landingorg"
            element={
              <>
                <NavbarOrg />
                <Landingorg />
              </>
            }
          />
          <Route
            exact
            path="/edit-profile"
            element={
              <>
                <Navbar />
                <EditProfile />
              </>
            }
          />
          <Route
            exact
            path="/edit-profileorg"
            element={
              <>
                <NavbarOrg />
                <EditProfile />
              </>
            }
          />
          <Route exact path="/faqs" element={<Faq />} />
          <Route exact path="/terms" element={<Termsandpolicy />} />
          <Route
            exact
            path="/posts"
            element={
              <>
                <Navbar />
                <Posts />
              </>
            }
          />
          <Route
            exact
            path="/postsorg"
            element={
              <>
                <NavbarOrg />
                <PostsOrg />
              </>
            }
          />
          <Route
            exact
            path="/posts/:id"
            element={
              <>
                <Navbar />
                <Post />
              </>
            }
          />
          <Route exact path="/profile/:user_id" element={<Profiles />} />
          <Route
            exact
            path="/landingpage"
            element={
              <>
                <Navbar />
                <LandingPage />
              </>
            }
          />
          <Route exact path="/dashboard" element={<Dashboard />} />
          {/* registeredevent */}
          <Route
            exact
            path="/registerevent/:id"
            element={<RegisteredEvent />}
          />
          <Route
            exact
            path="/waitinglistevent/:id"
            element={<Waitinglistevent />}
          />
          <Route
            exact
            path="/SearchPeople"
            element={
              <>
                <Navbar />
                <SearchPeople />
              </>
            }
          />
          <Route
            exact
            path="/SearchPeopleorg"
            element={
              <>
                <NavbarOrg />
                <SearchPeopleOrg />
              </>
            }
          />
          <Route
            path="/gotoprofile/:id"
            element={
              <>
                <Navbar />
                <ProfileInformation />
              </>
            }
          />
          <Route
            path="/gotoprofileorg/:id"
            element={
              <>
                <NavbarOrg />
                <ProfileInformation />
              </>
            }
          />
          <Route
            exact
            path="/SearchEvents"
            element={
              <>
                <Navbar />
                <SearchEvents />
              </>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <>
                <Navbar />
                <EventInformation />
              </>
            }
          />
          <Route path="/payment/:id" element={<Paymentevents />} />
          <Route path="/confi/:id" element={<Confirmationpageevent />} />
          <Route
            path="/event/:id"
            element={
              <>
                <NavbarOrg />
                <EventOrgInfo />
              </>
            }
          />
          <Route
            path="/event/:id/scan-qr"
            element={
              <>
                <NavbarOrg />
                <ScanQr />
              </>
            }
          />
          <Route
            path="/event/:eventId/edit"
            element={
              <>
                <NavbarOrg />
                <EditEvent />
              </>
            }
          />
          <Route path="/add-education" element={<AddEducation />} />
          <Route path="/add-experience" element={<AddExperience />} />
          <Route
            path="/registeredEvents"
            element={
              <>
                <Navbar />
                <RegisteredEvent />
              </>
            }
          />
          <Route
            path="/chatscreen"
            element={
              <>
                <Navbar />
                <Chatscreen />
              </>
            }
          />
          <Route
            path="/chatscreenorg"
            element={
              <>
                <NavbarOrg />
                <Chatscreen />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
