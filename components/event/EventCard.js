import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';

function EventCard({
  game, description, date, time, id, onUpdate, joined, user,
}) {
  const router = useRouter();

  const leaveTheEvent = () => {
    leaveEvent(id, { user_id: user.uid }).then(() => onUpdate());
  };

  const joinTheEvent = () => {
    joinEvent(id, { user_id: user.uid }).then(() => onUpdate());
  };

  return (
    <Card className="text-center">
      <Card.Header>{game}</Card.Header>
      <Card.Body>
        <Card.Subtitle>
          {date}: {time}
        </Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        {joined ? (
          <Button
            variant="warning"
            onClick={leaveTheEvent}
          >
            Leave
          </Button>
        ) : (
          <Button
            onClick={joinTheEvent}
          >
            Sign Up
          </Button>
        )}
        <Button
          onClick={() => {
            router.push(`/events/edit/${id}`);
          }}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            deleteEvent(id).then(() => {
              onUpdate();
            });
          }}
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  game: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  joined: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
