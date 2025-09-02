import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../components/pages/Home";
import Tours from "../components/pages/Tours";
import TourDetails from "../components/pages/TourDetails";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import SearchResultList from "../components/pages/SearchResultList";
import ThankYou from "../components/pages/ThankYou";



const Routers = () => (
  <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tours/search" element={<SearchResultList />} />
    </Routes>
);

export default Routers;
