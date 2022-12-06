import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GameCard from '../../components/game/GameCard';
import { useAuth } from '../../utils/context/authContext';
import { getGameById } from '../../utils/data/gameData';

export default function GameDetailPage() {
  const [game, setGame] = useState([]);
  const router = useRouter();
  const { gameId } = router.query;
  const { user } = useAuth();

  const getGame = () => {
    getGameById(gameId).then(setGame);
  };

  useEffect(() => {
    getGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, gameId]);

  return <GameCard title={game.title} maker={game.maker} numberOfPlayers={game.numberOfPlayers} skillLevel={game.skillLevel} user={user} gameType={game.gameTypeId} />;
}
