import { useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddEducation from "./components/profile-forms/AddEducation";
import AddEvent from "./components/profile-forms/AddEvent";
import Profile from "./components/profile/Profile";
import Profiles from "./components/profiles/Profiles";
function App() {
  return (
    <>
    <Profiles />
       <AddEvent />
       <AddEducation />
      <BrowserRouter>
        <Routes>
          <Route path="/profile/:user_id" element={<Profile />} />
        </Routes>
      </BrowserRouter>
   
    </>
  );
}

export default App;
