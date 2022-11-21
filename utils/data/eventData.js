import axios from 'axios';
import { clientCredentials } from '../client';

const getEvents = () => new Promise((resolve, reject) => {
  axios.get(`${clientCredentials.databaseURL}/events`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getEvents };
