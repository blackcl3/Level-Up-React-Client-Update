import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getGameById } from '../../../utils/data/gameData';
import GameForm from '../../../components/game/GameForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditGameForm() {
  const [game, setGame] = useState({});
  const router = useRouter();
  const { gameId } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getGameById(gameId).then(setGame);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>Edit Game Form</div>
      <GameForm obj={game} user={user} />
    </>
  );
}
