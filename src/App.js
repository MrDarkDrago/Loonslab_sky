import React, { useContext } from 'react';
import { Routes } from "react-router";
import Navi_bar from "./components/navi_bar";
import BackgroundImage from ".//components/BackIMG"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Sign_in from './pages/Sign_in';
import Colombo from './pages/Colombo';
import Loon_week from './pages/loon_week';

function App() {
  return (
    <>
      <Navi_bar />
      <BackgroundImage />
      <Router>
        <Routes>
          <Route exact path="/Loonslab_sky/" element={<Sign_in />} />
          <Route path="/" element={<Sign_in />} />
          <Route path="/Colombo" element={<Colombo />} />
          <Route path="/week" element={<Loon_week />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
