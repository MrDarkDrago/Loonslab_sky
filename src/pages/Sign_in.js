import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../CSS/Sign_in.css"
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

function Sign_in() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleButtonClick(event) {
    event.preventDefault(); // Prevent form submission

    // Check if the username and password are correct
    if (username === 'loon' && password === '1234') {
      navigate('/Colombo', { replace: true }); // Replace with the actual path of your next page
    } else {
      // Invalid username or password
      alert('Invalid username or password');
    }


  }
  return (
    <Container>
      <Row>
        <Col >
          <center>
            <i><h1 className='home_note'>Know Your Weather</h1></i>
          </center>
        </Col>
        <Col>
          <div className='sign_div'>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label><b>Username</b></Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label><b>Password</b></Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <center>
                <Button variant="primary" type="submit" className='sign_btn' onClick={handleButtonClick}>
                  Sign in
                </Button>
              </center>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>

  );
}

export default Sign_in;