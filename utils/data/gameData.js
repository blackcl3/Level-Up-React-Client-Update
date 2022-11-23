import axios from 'axios';
import { clientCredentials } from '../client';

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getGameById = (id) => new Promise((resolve, reject) => {
  axios.get(`${clientCredentials.databaseURL}/games/${id}`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const createGame = (game) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
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

const updateGame = (game) => new Promise((resolve, reject) => {
  axios.put(`${clientCredentials.databaseURL}/games/${game.id}`, game)
    .then(resolve)
    .catch(reject);
});

export {
  getGames, getGameById, createGame, getGameTypes, updateGame,
};
