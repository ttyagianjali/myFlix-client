import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';


export class FavoritesView extends React.Component {
  constructor(props) {
    super(props);
    console.log('FavoritesView Loaded')
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  removeFavorite(movie) {
    const token = localStorage.getItem("token");
    const url = 'https://my-flix-007.herokuapp.com/users/';
    const user = localStorage.getItem("user");
    
    axios.delete(url + user + "/movies/" + movie._id, {
      
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Removed from favorites");
        // this.componentDidMount();
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

  render() {
    const FavoriteMovies = this.props.user.FavoriteMovies||[];
    const { movies } = this.props;
    console.log('FavMovies render', FavoriteMovies);
    

    return (
    <Container className="parentContainer">
      <Card className='profile-card p-3 mt-2'>
        <Card.Title className='profile-title'>{this.props.user.Username}'s Favorite Movies</Card.Title>
          {FavoriteMovies.length === 0 && <div className='card-content'>You don't have any favorite movies yet!</div>}
          <div className='favorites-container'>
              {FavoriteMovies.length > 0 && movies.map((movie) => {
                if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                  return (
                    <div key={movie._id}>
                        <Card style={{ width: '15rem', float: 'left' }} className='d-inline-flex align-content-start m-1'>
                            <Card.Img className='favorites-movie p-2' variant="top" src={movie.Image_link} />
                            <Card.Body className='movie-card-body'>
                              <Button className='remove-favorite' variant='danger' 
                                onClick={() => this.removeFavorite(movie)}> Remove
                              </Button>
                            </Card.Body>
                          </Card>
                    </div>
                    );
                  }
                })}
          </div>
      </Card>
        </Container>
  )}
}


let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps)(FavoritesView);