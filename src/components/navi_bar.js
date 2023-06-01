import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from '../pages/Home';
import Sign_in from '../pages/Sign_in';

import Colombo from '../pages/Colombo';
import Loon_week from '../pages/loon_week';

function Navi_bar() {
  return (
    <>
      <div>
        <Router>
          <Navbar bg="light" expand="lg">
            <Container fluid className='Navbar'>
              <Navbar.Brand className="Navbar_links" style={{ fontSize: "35px" }}>
                Loon Sky
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="ms-auto" style={{ maxHeight: '100px', fontSize: "20px" }} navbarScroll>
                  
                  <Nav.Link as={Link} to="/Loonslab_sky/" className="Navbar_links" style={{ fontSize: "25px" }}>
                    Home
                  </Nav.Link>
                  
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Routes>
            <Route exact path="/Loonslab_sky/" element={<Sign_in />} />
            <Route path="/Colombo" element={<Colombo />} />
            <Route path="/week" element={<Loon_week />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default Navi_bar;