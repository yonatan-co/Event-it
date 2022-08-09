import React from "react";

import { Routes, Route, Link } from "react-router-dom";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import FeedPage from "./pages/FeedPage";
import HomePage from "./pages/HomePage";
import CreateEventPage from "./pages/CreateEventPage";
import UpdateEventPage from "./pages/UpdateEventPage";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/create-event" element={<CreateEventPage />} />

        <Route path="/feed/update-event/:id" element={<UpdateEventPage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
