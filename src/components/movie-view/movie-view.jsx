import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addFavorite(movie) {
    const token = localStorage.getItem("token");
    const url =
      "https://my-flix-007.herokuapp.com/users/" +
      localStorage.getItem("user") + "/movies/" + movie._id;

    axios.post(url, "", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        alert(movie.Title + " has been added to favorites!");
      });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="parentContainer">
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.Image_link} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
<div className="buttonDiv">
        <Link to={`/directors/${movie.Director.Name}`}>
  <Button className="button" variant="primary">Director</Button>
</Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
  <Button className="button" variant="primary">Genre</Button>
          </Link>
          <Button className="button" variant='primary' 
            onClick={() => { this.addFavorite(movie);}}> Add to Favorites
  </Button>
          
            <Button className="button" onClick={() => { onBackClick(null); }}>Back</Button>
            </div>
        </div>
        </Container>
      
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Image_link: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    })
  }).isRequired
};

