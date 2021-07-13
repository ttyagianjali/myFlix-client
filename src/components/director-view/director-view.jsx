
import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

// import "./director-view.scss"

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
<Container className="parentContainer">
      <div className="director-view">
        <div className="my-2">
          <span className="label font-weight-bold">Director: </span>
          <span className="value">{director.Name}</span>
        </div>
        <div className="my-2">
          <span className="label font-weight-bold">Biography: </span>
          <span className="value">{director.Bio}</span>
        </div>
        <div className="my-2">
          <span className="label font-weight-bold">Born: </span>
          <span className="value">{director.Born}</span>
        </div>
        <div className="my-2">
          <span className="label font-weight-bold">Death: </span>
          <span className="value">{director.Death}</span>
        </div>
          <Button variant="primary"  onClick={()=>onBackClick()}>Back</Button>
        </div>
        </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Born: PropTypes.string.isRequired,
      Death: PropTypes.string
  }).isRequired
};

