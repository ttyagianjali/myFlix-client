import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';
import { updateUser } from '../../actions/actions';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from 'react-bootstrap/Form';



export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: null
    };
    console.log('Profile View Loaded');
    this.handleUpdate = this.handleUpdate.bind(this);
    this.deRegister = this.deRegister.bind(this);
  }

  handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const url = 'https://my-flix-oo7.herokuapp.com/users/';

    axios.put(url + user,{
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthday: newBirthday ? newBirthday : this.state.Birthday,
      },
    })
      .then(response => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        alert('Changes have been saved!');
        localStorage.setItem('user', this.state.Username);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  deRegister(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const url = 'https://my-flix-007.herokuapp.com/users/';

    axios.delete(url + user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then( result => {
        localStorage.clear();
        setUser({
          user: null,
          token: null
        });
        window.open('/', '_self');
        alert('Your account has been deleted!');
      })
      .catch(() => {
        console.log('error deleting the user');
      });
  }

  render() {
    const { validated } = this.state;
    const { onBackClick } = this.props;
    // const validated = null
    // const username = localStorage.getItem('user');
    

    return (
    <Container className="parentContainer">
    <div>
      <Card className="my-3">
        <Card.Body>
          <Form noValidate validated={validated} className='update-form' onSubmit={(e) => this.handleUpdate(e, this.Username, this.Password, this.Email, this.Birthday)}>
            <Row className="justify-content-center">
              <Col xs={10} md={8} lg={6}>
                <h5>Update your Profile</h5>
                <Form.Group controlId="BasicUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text"
                  placeholder="Enter current or new Username"
                  autoComplete="username"
                  onChange={(e) => this.setUsername(e.target.value )} 
                  pattern='[a-zA-Z0-9]{5,}'
                  minLength="5" />
                  <Form.Control.Feedback type='invalid'>Enter a Username with at least 5 alphanumeric characters</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="BasicPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password"
                  placeholder="Enter current or new Password"
                  autoComplete="password"
                  onChange={(e) => this.setPassword(e.target.value )} minLength="5" required />
                  <Form.Control.Feedback type='invalid'>Enter a valid password with at least 5 characters</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="BasicEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email"
                  placeholder="Change email" 
                  autoComplete="email"
                  onChange={(e) => this.setEmail(e.target.value )} />
                  <Form.Control.Feedback type='invalid'>Please enter a valid email address.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="BasicBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control type="date"
                  onChange={(e) => this.setBirthday(e.target.value )} />
                  <Form.Control.Feedback type='invalid'>Please enter a valid date.</Form.Control.Feedback>
                </Form.Group>
                <Button variant="secondary" type="submit">Update</Button><hr />
                <Button variant="secondary" className="my-2" onClick={() => { onBackClick(null); }}>Back</Button>
                <p className="my-3">Deregister Account: - Cannot be undone!</p>
                <Button variant="danger"  onClick={(e) => this.deRegister(e)}>Deregister</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
        </div>
         </Container>
  )}
}

// PropTypes.checkPropTypes(ProfileView.propTypes);
// ProfileView.propTypes = {
//   user: PropTypes.object.isRequired,
//   onBackClick: PropTypes.func.isRequired
// }

let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);


