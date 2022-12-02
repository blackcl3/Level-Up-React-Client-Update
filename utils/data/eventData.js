import axios from 'axios';
import { clientCredentials } from '../client';

const getEvents = (user = '') => new Promise((resolve, reject) => {
  axios
    .get(`${clientCredentials.databaseURL}/events?uid=${user}`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getEventById = (id) => new Promise((resolve, reject) => {
  axios.get(`${clientCredentials.databaseURL}/events/${id}`)
    .then((response) => resolve(response.data))
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

const updateEvent = (event) => new Promise((resolve, reject) => {
  axios.put(`${clientCredentials.databaseURL}/events/${event.id}`, event)
    .then(resolve)
    .catch(reject);
});

const deleteEvent = (id) => new Promise((resolve, reject) => {
  axios.delete(`${clientCredentials.databaseURL}/events/${id}`)
    .then(resolve)
    .catch(reject);
});

const leaveEvent = (eventId, user) => new Promise((resolve, reject) => {
  axios.delete(`${clientCredentials.databaseURL}/events/${eventId}/leave`, { data: user }).then(resolve).catch(reject);
});

const joinEvent = (eventId, user) => new Promise((resolve, reject) => {
  axios.post(`${clientCredentials.databaseURL}/events/${eventId}/signup`, user).then(resolve).catch(reject);
});

export {
  getEvents, getEventById, createEvent, updateEvent, deleteEvent, leaveEvent, joinEvent,
};
