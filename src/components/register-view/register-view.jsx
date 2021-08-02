import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // registration-view.jsx
axios.post('https://my-flix-007.herokuapp.com/users', {
  Username: username,
  Password: password,
  Email: email,
  Birthday: birthday
})
.then(response => {
  const data = response.data;
  console.log(data);
  window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
})
.catch(e => {
  console.log('error registering the user')
});
}

  return (
  <Container className="parentContainer">
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Password"onChange={e => setPassword(e.target.value)} />
    </Form.Group>
    
    <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} />
    </Form.Group>
    
    <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
    </Form.Group>
    <div className="buttonDiv">
     <Button variant="primary" type="submit" className="button" onClick={handleRegister}>
       Submit
      </Button>
   <Link to={`/`}>
            <Button variant="primary" className="button" type="submit" >Back</Button>
        </Link>
       </div>
      </Form>
      </Container>
  );
}




