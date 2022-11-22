import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';

const EventForm = ({ user }) => {
  const [games, setGames] = useState([]);

  const [currentEvent, setCurrentEvent] = useState({
    description: '',
    date: '',
    time: '',
    gameId: 0,
  });

  const router = useRouter();

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      game_id: Number(currentEvent.gameId),
      organizer_id: user.uid,
    };
    createEvent(event).then(() => router.push('/events'));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Event description</Form.Label>
        <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Date of Event</Form.Label>
        <Form.Control name="date" type="date" required value={currentEvent.date} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Time of Event</Form.Label>
        <Form.Control name="time" type="time" required value={currentEvent.time} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Select name="gameId" onChange={handleChange}>
          <option value="">Select a Game</option>
          {games?.map((game) => (
            <option key={game.id} value={game.id} selected={currentEvent.gameId === game.id}>
              {game.title}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventForm;
