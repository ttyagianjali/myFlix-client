import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

export class GenreView extends React.Component{

  render() {
    const { genre, onBackClick } = this.props;
  
    return (
      <Container className="parentContainer">
      <div className="genre-view">
        <div className="my-2">
          <span className="label font-weight-bold">Director: </span>
          <span className="value">{genre.Name}</span>
        </div>
        <div className="my-2">
          <span className="label font-weight-bold">Biography: </span>
          <span className="value">{genre.Description}</span>
        </div>
        <Button variant="info" className="my-3" onClick={()=>onBackClick()}>Back</Button>
        </div>
        </Container>
    )
  }
}


GenreView.propTypes = {
  genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string,
  }).isRequired
};