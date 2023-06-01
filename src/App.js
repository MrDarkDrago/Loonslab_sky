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
    <div>
      <Navi_bar />
      <BackgroundImage />
    </div>

  );
}

export default App;
