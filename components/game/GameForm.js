import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  game_type: {
    id: 0,
  },
};

const GameForm = ({ obj, user }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const router = useRouter();

  const getGames = () => {
    if (obj.id) {
      setCurrentGame(obj);
    }
    getGameTypes().then(setGameTypes);
  };

  useEffect(() => {
    getGames();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj]);

  // eslint-disable-next-line no-unused-vars
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      number_of_players: Number(currentGame.numberOfPlayers),
      skill_level: Number(currentGame.skillLevel),
      game_type: Number(currentGame.game_type.id),
      user_id: user.uid,
    };
    if (obj.id) {
      const gameTypeId = { ...currentGame, game_type: Number(currentGame.game_type) };
      updateGame(gameTypeId).then(() => router.push(`/games/${gameTypeId.id}`));
    } else {
      // Send POST request to your API
      createGame(game).then(() => router.push(`/games/${game.id}`));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Game Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Select name="game_type" onChange={handleChange}>
            <option value="">Select a Game Type</option>
            {gameTypes?.map((gameType) => (
              <option key={gameType.id} value={gameType.id} selected={currentGame.game_type.id === gameType.id}>
                {gameType.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    numberOfPlayers: PropTypes.number,
    skillLevel: PropTypes.number,
    gameTypeId: PropTypes.number,
  }),
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

GameForm.defaultProps = {
  obj: initialState,
};

export default GameForm;
