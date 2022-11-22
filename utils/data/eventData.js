import axios from 'axios';
import { clientCredentials } from '../client';

const getEvents = () => new Promise((resolve, reject) => {
  axios.get(`${clientCredentials.databaseURL}/events`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then(resolve)
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getEvents, createEvent };
