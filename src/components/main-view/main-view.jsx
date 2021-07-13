import React from 'react';
import axios from 'axios';
import { RegisterView } from '../register-view/register-view';
import { LoginView } from '../login-view/login-view';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { FavoritesView } from '../favorites-view/favorites-view';
import { GenreView } from '../genre-view/genre-view';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { ProfileView } from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';



export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }
  
  onLoggedIn (authData) {
    this.props.setUser(authData);
    this.setState({
      user: authData.user
    });
    console.log('onLoggedIn reached', authData)
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://my-flix-007.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser(token) {
    const user = localStorage.getItem("user")
    axios
      .get('https://my-flix-007.herokuapp.com/users/' + user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUser(response.data)
        this.setState({
          user: response.data
        });
        console.log('getUser response', response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log('getUser reached')
  }


  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }


  render() {
      let { movies } = this.props;
      let { user } = this.state;
      return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Container className="navbarContainer">
            <Navbar bg="dark" variant="dark" fixed="top">
              <Navbar.Brand>MyFlix App</Navbar.Brand>
              <ul>
                <Link to={`/`}>
                  <Button variant="link" className="navbar-link text-light">Movies</Button>
                </Link >
                <Link to={`/users/:Username`}>
                  <Button variant="link" className="navbar-link text-light">Profile</Button>
                  </Link>
                  <Link to={`/users/:Username/Movies/:MovieID`}>
                  <Button variant="link" className="navbar-link text-light">Favorite Movies</Button>
                </Link>
                <Link to={`/`}>
                  <Button variant="link" className="navbar-link text-light"
                    onClick={() => this.onLoggedOut()}
                  >Logout</Button>
                </Link >
              </ul >
            </Navbar >
          </Container>
            <Route exact path="/" render={() => {
              if (!user) return <Col md={4}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies}/>;
            }} />
            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              if (!user) {
                return <Col md={4}>
                  <RegisterView />
                </Col>
              }
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return <Col md={4}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) return <Col md={4}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />

            <Route path="/genres/:name" render={({ match, history }) => {
              if (!user) return <Col md={4}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />

            <Route path="/users/:Username" render={({ match, history }) => {
              if (!user) return <Col md={4}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Row><Col md={8}>
                <ProfileView 
                      user={user}
                      onBackClick={() => history.goBack()} />
              </Col>
              
              <Col md={8}>
                <FavoritesView user={user} movies={movies} />
                </Col>
                </Row>
            }} />
        
          </Row>
        </Router>
      );
    }
}
  
let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps, { setMovies, setUser } )(MainView);


