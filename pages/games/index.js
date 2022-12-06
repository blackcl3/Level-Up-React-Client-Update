import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import GameCard from '../../components/game/GameCard';
import { deleteGame, getGames } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  function getPageContent() {
    getGames().then((data) => setGames(data));
  }

  useEffect(() => {
    getPageContent();
  }, []);

  return (
    <article className="games">
      <h1>Games</h1>
      <Button
        onClick={() => {
          router.push('/games/new');
        }}
      >
        Register New Game
      </Button>
      ;
      {games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard id={game.id} title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} gameType={game.game_type} />
          <Button
            onClick={() => {
              router.push(`/games/edit/${game.id}`);
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteGame(game.id).then(() => { getPageContent(); });
            }}
          >Delete
          </Button>
        </section>
      ))}
    </article>
  );
}

export default Home;
