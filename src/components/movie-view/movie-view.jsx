import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export class MovieView extends React.Component {
 

  render() {
    const { movie, onBackClick, Director } = this.props;

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
        <Button onClick={() => { onBackClick(null); }}>Back</Button>

        <Link to={`/directors/${movie.Director.Name}`}>
  <Button variant="link">Director</Button>
</Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
  <Button variant="link">Genre</Button>
    </Link>
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

