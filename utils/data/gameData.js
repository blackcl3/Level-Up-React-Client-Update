import axios from 'axios';
import { clientCredentials } from '../client';

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`)
    .then((response) => resolve((response.json())))
    .catch(reject);
});

const getGameById = (id) => new Promise((resolve, reject) => {
  axios.get(`${clientCredentials.databaseURL}/games/${id}`)
    .then((response) => (response.data))
    .then((data) => {
      resolve(({
        id: data.id,
        skillLevel: data.skill_level,
        numberOfPlayers: data.number_of_players,
        title: data.title,
        maker: data.maker,
        gameTypeId: data.game_type.id,
      }));
    })
    .catch(reject);
});

const createGame = (game, user) => new Promise((resolve, reject) => {
  const gameObj = {
    maker: game.maker,
    title: game.title,
    number_of_players: Number(game.numberOfPlayers),
    skill_level: Number(game.skillLevel),
    game_type: Number(game.gameTypeId.id),
    user_id: user.uid,
  };
  fetch(`${clientCredentials.databaseURL}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameObj),
  })
    .then(resolve)
    .catch(reject);
});

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/gametypes`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateGame = (user, game, id) => new Promise((resolve, reject) => {
  const gameObj = {
    maker: game.maker,
    title: game.title,
    number_of_players: Number(game.numberOfPlayers),
    skill_level: Number(game.skillLevel),
    game_type: Number(game.gameTypeId),
    user_id: user.uid,
  };
  axios.put(`${clientCredentials.databaseURL}/games/${id}`, gameObj)
    .then(resolve)
    .catch(reject);
});

const deleteGame = (id) => new Promise((resolve, reject) => {
  axios.delete(`${clientCredentials.databaseURL}/games/${id}`)
    .then(resolve)
    .catch(reject);
});

export {
  getGames, getGameById, createGame, getGameTypes, updateGame, deleteGame,
};
