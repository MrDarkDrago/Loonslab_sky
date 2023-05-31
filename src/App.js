import React, { useContext } from 'react';
import { Routes } from "react-router";
import Navi_bar from "./components/navi_bar";
import BackgroundImage from ".//components/BackIMG"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


function App() {
  return (
    <>
      <Navi_bar />
      <BackgroundImage />
    </>
  );
}

export default App;
