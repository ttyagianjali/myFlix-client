import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


export function UpdateView (props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const token = localStorage.getItem('token');
  const user = localStorage.getItem("user");

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put('https://my-flix-007.herokuapp.com/users/' + user, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        // '_self' will open in the current tab
        window.open('_self');
      })
      .catch(e => {
        console.log('error updating the user');
        alert('Unable to update user')
      });
  };

  const deRegister = (e) => {
    e.preventDefault();
    axios.delete('https://my-flix-007.herokuapp.com/users/' + user, { 
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        const data = response.data;
        console.log(data);
        // '_self' will open in the current tab
        window.open('/register');
      })
      .catch(e => {
        console.log('error deleting the user');
      });
  };

  return (
    <Card className="m-3">
      <Form>
        <Row className="justify-content-center">
          <Col xs={8} lg={6}><br></br>
            <h5>Update your Profile</h5>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" 
              placeholder="Enter password"
              value={username}
              autoComplete="username"
              onChange={e => setUsername(e.target.value)} 
              minLength="5" required />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" 
              placeholder="Enter password"
              value={password}
              autoComplete="password"
              onChange={e => setPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="FormEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" 
              placeholder="Enter email" 
              value={email}
              autoComplete="email"
              onChange={e => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control type="date" 
              value={birthday} 
              onChange={e => setBirthday(e.target.value)} />
            </Form.Group>
            <Button variant="dark" type="submit" onClick={handleUpdate}>Update</Button>
            <Form.Group><br />
            <p>Deregister Account: - Cannot be undone!</p>
            <Button variant="danger" type="submit" onClick={deRegister}>Deregister</Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
UpdateView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.number
  })
};