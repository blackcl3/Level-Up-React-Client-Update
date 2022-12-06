import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const GameCard = ({
  title, //
  maker,
  numberOfPlayers,
  skillLevel,
  gameType,
}) => (
  <Card className="text-center">
    <Card.Header>{title}</Card.Header>
    <Card.Body>
      <Card.Title>By: {maker}</Card.Title>
      <Card.Subtitle>Type: {gameType.label}</Card.Subtitle>
      <Card.Text>{numberOfPlayers} players needed</Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
  </Card>
);

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  gameType: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameCard;
