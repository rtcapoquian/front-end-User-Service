import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
//from auth
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Resetpass from "./components/auth/Resetpass";
import Sende from "./components/auth/Sende";

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
import EventOrgInfo from "./components/profile-forms/EventOrgInfo";
//registered event
import RegisteredEvent from "./components/dashboard/RegisteredEvent";
import Waitinglistevent from "./components/dashboard/Waitinglistevent";
import SearchEvents from "./components/dashboard/SearchEvents";
import EventInformation from "./components/dashboard/EventInformation";
import Paymentevents from "./components/profile-forms/Paymentevents";
import Confirmationpageevent from "./components/dashboard/Confirmationpageevent";
import SearchPeople from "./components/dashboard/SearchPeople";
import ProfileInformation from "./components/dashboard/ProfileInformation";
import EditEvent from "./components/profile-forms/EditEvent";
import ScanQr from "./components/profile-forms/ScanQr";

function App() {
  return (
    <>
      <h1>Frontend User Service</h1>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          {/* ROutes */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/Sende" element={<Sende />} />
          <Route exact path="/resetpass/:id" element={<Resetpass />} />
          {/* End of Routes */}
          <Route exact path="/dashboardOrg" element={<DASHBOARDORG />} />
          <Route exact path="/addevent" element={<AddEvent />} />
          <Route exact path="/landingorg" element={<Landingorg />} />
          <Route exact path="/edit-profile" element={<EditProfile />} />
          <Route exact path="/faqs" element={<Faq />} />
          <Route exact path="/terms" element={<Termsandpolicy />} />
          <Route exact path="/posts" element={<Posts />} />
          <Route exact path="/posts/:id" element={<Post />} />
          <Route exact path="/profile/:user_id" element={<Profiles />} />
          <Route exact path="/landingpage" element={<LandingPage />} />
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
          <Route exact path="/SearchPeople" element={<SearchPeople />} />
          <Route path="/gotoprofile/:id" element={<ProfileInformation />} />
          <Route exact path="/SearchEvents" element={<SearchEvents />} />
          <Route path="/edit/:id" element={<EventInformation />} />
          <Route path="/payment/:id" element={<Paymentevents />} />
          <Route path="/confi/:id" element={<Confirmationpageevent />} />
          <Route path="/event/:id" element={<EventOrgInfo />} />
          <Route path="/event/:id/scan-qr" element={<ScanQr />} />
          <Route path="/event/:eventId/edit" element={<EditEvent />} />
          <Route path="/add-education" element={<AddEducation />} />
          <Route path="/add-experience" element={<AddExperience />} />
          <Route path="/registeredEvents" element={<RegisteredEvent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
