import React from "react";

import { createGlobalStyle } from "styled-components";

import { Routes, Route, Link } from "react-router-dom";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import FeedPage from "./pages/FeedPage";
import HomePage from "./pages/HomePage";
import CreateEventPage from "./pages/CreateEventPage";
import UpdateEventPage from "./pages/UpdateEventPage";
import ViewEventPage from "./pages/ViewEventPage";
import UserPage from "./pages/UserPage";
import LogoutPage from "./pages/LogoutPage";

const GlobalStyle = createGlobalStyle`
@media screen and (min-width: 480px) {
  body {
    background: #F1EFDC;
    font-family: Roboto;
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    width: 1900px;
    height: 200px;
    position: absolute;
    ::-webkit-scrollbar {
    display: none;
}
    }
  }
`;

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/create-event" element={<CreateEventPage />} />
        <Route path="/feed/view/:id" element={<ViewEventPage />} />
        <Route path="/feed/update-event/:id" element={<UpdateEventPage />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
