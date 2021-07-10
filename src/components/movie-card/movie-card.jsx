import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import './movie-card.scss';
import { Container } from 'react-bootstrap';

export class MovieCard extends React.Component {
  
  render() {
    const { movie } = this.props;

    return (
    <Container className="parentContainer">
      <Card className="movieCard">
        <Card.Img className="movieCardImg" variant="top" src={movie.Image_link} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>

          <Link to={`/movies/${movie._id}`}>
            <Button className="movieCardButton" variant="link" >Open</Button>
          </Link>
          
        </Card.Body>
        </Card>
        </Container>
    );
  }
}

