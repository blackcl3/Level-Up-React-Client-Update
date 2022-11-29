import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

const EventCard = ({
  id,
  game,
  description,
  date,
  time,
}) => {
  const router = useRouter();
  return (
    <Card className="text-center">
      <Card.Header>{game}</Card.Header>
      <Card.Body>
        <Card.Subtitle>
          {date}: {time}
        </Card.Subtitle>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Button
        onClick={() => {
          router.push(`/events/edit/${id}`);
        }}
      >
        Edit
      </Button>
    </Card>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  game: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
};

export default EventCard;
