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
import AddEvent from "./components/profile-forms/AddEvent";

//from profile
import Profile from "./components/profile/Profile";
import Profiles from "./components/profiles/Profiles";
//test
import Landing from "./components/layout/Landing";
import DASHBOARDORG from "./components/dashboard/dashboardOrg";
import Landingorg from "./components/dashboard/landingorg";
//faq and terms
import Faq from "./components/layout/faq";
import Termsandpolicy from "./components/layout/termsandpolicy";
//post
import Posts from "./components/post/Posts";
import Post from "./components/posts/Post";
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
          <Route exact path="/faqs" element={<Faq/>} /> 
          <Route exact path="/terms" element={<Termsandpolicy/>} />
          <Route exact path='/posts' element={<Posts />} />
          <Route exact path='/posts/:id' element={<Post />} />
          <Route exact path="/profile/:user_id" element={<Profiles />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
