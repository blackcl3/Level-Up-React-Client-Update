import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent, updateEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';

const initialState = {
  description: '',
  date: '',
  time: '',
  game: 0,
};

const EventForm = ({ obj, user }) => {
  const [games, setGames] = useState([]);

  const [currentEvent, setCurrentEvent] = useState(initialState);

  const router = useRouter();

  const getGamesandSetForm = () => {
    if (obj.id) {
      setCurrentEvent(obj);
    }
    getGames().then(setGames);
  };

  useEffect(() => {
    getGamesandSetForm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj]);

  const handleChange = (e) => {
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
      game: Number(currentEvent.game),
      organizer_id: user.uid,
    };
    if (obj.id) {
      const gameId = { ...currentEvent, game_id: currentEvent.game };
      updateEvent(gameId).then(() => router.push(`/events/${gameId.id}`));
    } else {
      createEvent(event).then(() => router.push(`/events/${event.id}`));
    }
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
        <Form.Select name="game" onChange={handleChange}>
          <option value="">Select a Game</option>
          {games?.map((game) => (
            <option key={game.id} value={game.id} selected={currentEvent.game === game.id}>
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
  obj: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    game: PropTypes.number,
  }),
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;
